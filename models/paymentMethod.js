module.exports = (sequelize, DataTypes) => {
  const PaymentMethod = sequelize.define('PaymentMethod', {
    payment_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true ,allowNull:true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    method_type: DataTypes.STRING,
    details: DataTypes.STRING
  }, {
    tableName: 'payment_method',
    timestamps: false,
  });

  PaymentMethod.associate = function(models) {
    PaymentMethod.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return PaymentMethod;
};
