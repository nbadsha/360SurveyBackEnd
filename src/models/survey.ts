import { DataTypes } from "sequelize"
const sequelize = require('../SQLITE3DB/database')

const Survey = sequelize.define('survey',{
    survey_link:{
        type:DataTypes.TEXT
    }
})

module.exports = Survey