module.exports = function(sequelize, DataTypes) {
  var DogPost = sequelize.define("DogPost", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    tag:{
      type: DataTypes.STRING
    }
  },
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // An Author (foreignKey) is required or a Post can't be made
          DogPost.belongsTo(models.DogUser, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return DogPost;
};
