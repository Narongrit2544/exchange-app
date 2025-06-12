module.exports = (sequelize, DataTypes) => {
  const Currency = sequelize.define('Currency', {
    currency_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    symbol: { type: DataTypes.STRING, allowNull: false },
    exchange_rate: { type: DataTypes.FLOAT, allowNull: false }
  }, {
    tableName: 'currency',
    timestamps: false,
  });

  return Currency;
};
