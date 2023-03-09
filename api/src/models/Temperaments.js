const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('temperament', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ID:{
        type:DataTypes.UUID,
        allowNull:false,
        defaultValue:DataTypes.UUIDV1,
        primaryKey:true
      }
  }, {
    timestamps:false
  })}