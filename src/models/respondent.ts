import { DataTypes } from "sequelize"
const sequelize = require('../SQLITE3DB/database')

const Respondent = sequelize.define('respondent',{
    emp_id:{
        type: DataTypes.NUMBER,
        allowNull:false,
        unique:true
    },

    emp_name:{
        type:DataTypes.NUMBER,
        allowNull:false
    },

    department:{
        type:DataTypes.STRING,
        allowNull:false
    },
})

module.exports = Respondent