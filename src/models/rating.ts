import { DataTypes } from "sequelize"
const sequelize = require('../SQLITE3DB/database')


const Rating = sequelize.define('rating',{
    trait_rating:{
        type:DataTypes.NUMBER,
        allowNull:false
    }
}
)

module.exports = Rating