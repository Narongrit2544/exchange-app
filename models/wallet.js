module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    wallet_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    currency_id: { type: DataTypes.INTEGER, allowNull: false },
    balance: DataTypes.FLOAT
  }, {
    tableName: 'wallet',
    timestamps: false,
  });

  Wallet.associate = function(models) {
    Wallet.belongsTo(models.User, { foreignKey: 'user_id' });
    Wallet.belongsTo(models.Currency, { foreignKey: 'currency_id' });
    
  };

  return Wallet;
};
