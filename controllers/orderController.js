const db = require("../models");
const { sequelize } = require("../models");
const { v4: uuidv4 } = require("uuid"); // ต้อง npm install uuid

// ✅ ดึงรายการ order ทั้งหมด
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await db.Order.findAll({
      include: [
        { model: db.User, as: "Buyer", attributes: ["name"] },
        { model: db.User, as: "Seller", attributes: ["name"] },
        { model: db.Currency, attributes: ["symbol"] },
      ],
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};

exports.createOrder = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { seller_id, currency_id, amount, price } = req.body;

    // ✅ ตรวจสอบว่า currency_id นี้คือ USDT หรือไม่
    const usdtCurrency = await db.Currency.findOne({
      where: { symbol: "USDT" },
      transaction: t,
    });

    if (!usdtCurrency) {
      await t.rollback();
      return res.status(400).json({ error: "ไม่พบเหรียญ USDT" });
    }

    if (currency_id === usdtCurrency.currency_id) {
      await t.rollback();
      return res
        .status(400)
        .json({ error: "ไม่สามารถโพสต์ขายเหรียญ USDT ได้" });
    }

    // ✅ ตรวจสอบกระเป๋าเหรียญของผู้ขาย
    const sellerWallet = await db.Wallet.findOne({
      where: { user_id: seller_id, currency_id },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    if (!sellerWallet || sellerWallet.balance < amount) {
      await t.rollback();
      return res.status(400).json({ error: "ยอดเหรียญของผู้ขายไม่เพียงพอ" });
    }

    // ✅ หักเหรียญจากกระเป๋าผู้ขาย
    sellerWallet.balance -= amount;
    await sellerWallet.save({ transaction: t });

    // ✅ สร้างออร์เดอร์
    const order = await db.Order.create(
      {
        seller_id,
        currency_id,
        amount,
        price,
        status: "open",
        created_at: new Date(),
      },
      { transaction: t }
    );

    await t.commit();
    res.json({ message: "สร้างออร์เดอร์สำเร็จ", order });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};

// ✅ ซื้อ order
exports.buyOrder = async (req, res) => {
  const { order_id } = req.params;
  const { buyer_id } = req.body;

  const t = await db.sequelize.transaction();

  try {
    const order = await db.Order.findByPk(order_id, { transaction: t });

    if (!order || order.status !== "open") {
      await t.rollback();
      return res
        .status(400)
        .json({ error: "คำสั่งซื้อไม่ถูกต้องหรือถูกซื้อไปแล้ว" });
    }

    const currency_id = order.currency_id;
    const totalPrice = order.amount * order.price;

    // ✅ ใช้ USDT (หา currency_id โดยใช้ symbol)
    const usdtCurrency = await db.Currency.findOne({
      where: { symbol: "USDT" },
      transaction: t,
    });
    if (!usdtCurrency) {
      await t.rollback();
      return res.status(400).json({ error: "ไม่พบเหรียญ USDT" });
    }

    const buyerWallet = await db.Wallet.findOne({
      where: { user_id: buyer_id, currency_id: usdtCurrency.currency_id },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    if (!buyerWallet || buyerWallet.balance < totalPrice) {
      await t.rollback();
      return res.status(400).json({ error: "ยอด USDT ไม่เพียงพอ" });
    }

    const sellerWallet = await db.Wallet.findOne({
      where: {
        user_id: order.seller_id,
        currency_id: usdtCurrency.currency_id,
      },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    if (!sellerWallet) {
      await t.rollback();
      return res.status(400).json({ error: "Seller ไม่มี USDT wallet" });
    }

    // ✅ โอน USDT จาก buyer ไป seller
    buyerWallet.balance -= totalPrice;
    sellerWallet.balance += totalPrice;

    await buyerWallet.save({ transaction: t });
    await sellerWallet.save({ transaction: t });

    // ✅ ให้ buyer รับ crypto ที่สั่งซื้อ
    let cryptoWallet = await db.Wallet.findOne({
      where: { user_id: buyer_id, currency_id },
      transaction: t,
      lock: t.LOCK.UPDATE,
    });

    if (!cryptoWallet) {
      cryptoWallet = await db.Wallet.create(
        {
          user_id: buyer_id,
          currency_id,
          balance: 0,
        },
        { transaction: t }
      );
    }

    cryptoWallet.balance += order.amount;
    await cryptoWallet.save({ transaction: t });

    order.buyer_id = buyer_id;
    order.status = "completed";
    await order.save({ transaction: t });

    await db.Transaction.create(
      {
        order_id: order.order_id,
        payment_id: null,
        transaction_date: new Date(),
        amount: totalPrice,
        recipient_address: `user_${buyer_id}`,
        status: "confirmed",
        is_internal: true,
      },
      { transaction: t }
    );

    await t.commit();
    res.json({ message: "ซื้อสำเร็จ" });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};
