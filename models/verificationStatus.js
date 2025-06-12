module.exports = (sequelize, DataTypes) => {
  const VerificationStatus = sequelize.define('VerificationStatus', {
    verify_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    status: DataTypes.STRING,
    verified_date: DataTypes.DATE
  }, {
    tableName: 'verification_status',
    timestamps: false,
  });

  VerificationStatus.associate = function(models) {
    VerificationStatus.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return VerificationStatus;
};
