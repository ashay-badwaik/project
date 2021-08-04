var DataTypes = require("sequelize").DataTypes;
var _contact = require("./contact");
var _content = require("./content");

function initModels(sequelize) {
  var contact = _contact(sequelize, DataTypes);
  var content = _content(sequelize, DataTypes);


  return {
    contact,
    content,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
