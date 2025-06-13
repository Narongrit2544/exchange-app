module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    order_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true ,allowNull: true },
    buyer_id: { type: DataTypes.INTEGER, allowNull: true },
    seller_id: { type: DataTypes.INTEGER, allowNull: false },
    currency_id: { type: DataTypes.INTEGER, allowNull: false },
    amount: DataTypes.FLOAT,
    price: DataTypes.FLOAT,
    status: DataTypes.STRING,
    created_at: DataTypes.DATE
  }, {
    tableName: 'order',
    timestamps: false,
  });

  Order.associate = function(models) {
    Order.belongsTo(models.User, { foreignKey: 'buyer_id', as: 'Buyer' });
    Order.belongsTo(models.User, { foreignKey: 'seller_id', as: 'Seller' });
    Order.belongsTo(models.Currency, { foreignKey: 'currency_id' });
    Order.hasMany(models.ReviewRating, { foreignKey: 'order_id' });
    Order.hasOne(models.Transaction, { foreignKey: 'order_id' });
  };

  return Order;
};
