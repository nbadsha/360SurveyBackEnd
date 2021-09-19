const { Sequelize } =  require('sequelize')

const sequelize = new Sequelize('360SurveyDB', 'admin', 'admin', 
{
    dialect: 'sqlite',
    host:     './src/SQLITE3DB/360SurveyDB.sqlite',
    
})

module.exports = sequelize