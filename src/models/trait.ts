import {DataTypes } from "sequelize"
const sequelize = require('../SQLITE3DB/database')



const Trait = sequelize.define('trait',{
    trait_name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:false
    },
    trait_definition:{
        type:DataTypes.TEXT,
        allowNull:false
    }
})

module.exports = Trait
