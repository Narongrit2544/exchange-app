module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    registration_date: DataTypes.DATE
  }, {
    tableName: 'user',
    timestamps: false,
  });

  User.associate = function(models) {
    User.hasMany(models.Wallet, { foreignKey: 'user_id' });
    User.hasMany(models.Order, { foreignKey: 'buyer_id', as: 'BuyOrders' });
    User.hasMany(models.Order, { foreignKey: 'seller_id', as: 'SellOrders' });
    User.hasMany(models.PaymentMethod, { foreignKey: 'user_id' });
    User.hasOne(models.VerificationStatus, { foreignKey: 'user_id' });
    User.hasMany(models.ReviewRating, { foreignKey: 'user_id' });
  };

  return User;
};
