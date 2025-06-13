module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    transaction_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    payment_id: { type: DataTypes.INTEGER, allowNull: true },
    transaction_date: DataTypes.DATE,
    amount: DataTypes.FLOAT,
    status: DataTypes.STRING,
    recipient_address: DataTypes.STRING,
    is_internal: DataTypes.BOOLEAN
  }, {
    tableName: 'transaction',
    timestamps: false,
  });

  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Order, { foreignKey: 'order_id' });
    Transaction.belongsTo(models.PaymentMethod, { foreignKey: 'payment_id' });
  };

  return Transaction;
};
