module.exports = function(sequelize, DataTypes) {
  var DogUser = sequelize.define("DogUser", {
    // Giving the Author model a name of type STRING
    dog_name:{ 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    },  
    breed: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    fav_activity: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
     owner: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    imgURL:{
        type: DataTypes.STRING,
        allowNull: true
    },



    //do i need this for password encription, help me do this 
    password: {
        type: DataTypes.STRING,
        allowNull: false      
    },
    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    
  },
  {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // Associating Author with Posts
          // When an Author is deleted, also delete any associated Posts
          DogUser.hasMany(models.DogPost, {
            onDelete: "cascade"
          });
        }
      }
    }
  );
  return DogUser;
};