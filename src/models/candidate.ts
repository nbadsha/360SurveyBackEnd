import { DataTypes } from "sequelize"
const sequelize = require('../SQLITE3DB/database')


const Candidate = sequelize.define('candidate',{
    cand_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    job_role:{
        type:DataTypes.STRING,
        allowNull:false
    },
    company_name:{
        type:DataTypes.STRING,
        allowNull:false
    }
})



module.exports = Candidate


