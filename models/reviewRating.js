module.exports = (sequelize, DataTypes) => {
  const ReviewRating = sequelize.define('ReviewRating', {
    review_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    rating: DataTypes.INTEGER,
    created_at: DataTypes.DATE
  }, {
    tableName: 'review_rating',
    timestamps: false,
  });

  ReviewRating.associate = function(models) {
    ReviewRating.belongsTo(models.User, { foreignKey: 'user_id' });
    ReviewRating.belongsTo(models.Order, { foreignKey: 'order_id' });
  };

  return ReviewRating;
};
