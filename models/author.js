module.exports = function(sequelize, DataTypes) {
  var dogUser = sequelize.define("dogUser", {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING
  });
  return dogUser;
};
