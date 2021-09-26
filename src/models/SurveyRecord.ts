import { DataTypes } from "sequelize"
const sequelize = require('../SQLITE3DB/database')

const SurveyRecord = sequelize.define('survey_records',{
    rel_to_cand:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports = SurveyRecord