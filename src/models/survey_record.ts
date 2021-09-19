import { DataTypes } from "sequelize"
const sequelize = require('../SQLITE3DB/database')

const SurveyRecord = sequelize.define('survey_records')

module.exports = SurveyRecord