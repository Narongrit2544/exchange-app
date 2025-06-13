const db = require("../models");

// ✅ ฟังก์ชันดู wallet ทั้งหมด
exports.getAllWallets = async (req, res) => {
  try {
    const wallets = await db.Wallet.findAll({
      include: [{ model: db.User }, { model: db.Currency }],
    });
    res.json(wallets);
  } catch (err) {
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};

// ✅ ฟังก์ชันโอนเหรียญ
exports.transfer = async (req, res) => {
  const { sender_id, receiver_id, currency_id, amount } = req.body;

  if (!sender_id || !receiver_id || !currency_id || !amount) {
    return res.status(400).json({ error: "ข้อมูลไม่ครบ" });
  }

  const t = await db.sequelize.transaction();

  try {
    const senderWallet = await db.Wallet.findOne({
      where: { user_id: sender_id, currency_id },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    const receiverWallet = await db.Wallet.findOne({
      where: { user_id: receiver_id, currency_id },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    if (!senderWallet || senderWallet.balance < amount) {
      await t.rollback();
      return res.status(400).json({ error: "ยอดเงินไม่เพียงพอ" });
    }

    senderWallet.balance -= amount;
    receiverWallet.balance += amount;

    await senderWallet.save({ transaction: t });
    await receiverWallet.save({ transaction: t });

    await db.Transaction.create(
      {
        order_id: null,
        payment_id: null,
        amount,
        recipient_address: `user_${receiver_id}`,
        status: "confirmed",
        is_internal: true,
      },
      { transaction: t }
    );

    await t.commit();
    res.json({ message: "โอนเหรียญสำเร็จ" });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};


// ✅ ฟังก์ชันเติมเหรียญให้ผู้ใช้
  exports.addBalance = async (req, res) => {
    const { user_id, currency_id, amount } = req.body;

    if (!user_id || !currency_id || !amount) {
      return res.status(400).json({ error: "ข้อมูลไม่ครบ" });
    }

    try {
      let wallet = await db.Wallet.findOne({
        where: { user_id, currency_id },
      });

      if (!wallet) {
        // ถ้า wallet ยังไม่มี ให้สร้างใหม่
        wallet = await db.Wallet.create({
          user_id,
          currency_id,
          balance: amount,
        });
      } else {
        wallet.balance += amount;
        await wallet.save();
      }

      await db.Transaction.create({
        order_id: null,
        payment_id: null,
        amount,
        recipient_address: `user_${user_id}`,
        status: "confirmed",
        is_internal: true,
      });

      res.json({ message: "เติมเงินสำเร็จ", wallet });
    } catch (err) {
      res.status(500).json({ error: "Server Error", details: err.message });
    }
  };