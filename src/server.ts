import bodyParser = require('body-parser')
import * as express from 'express'
import UserRouter from './routers/UserRouter'
const sequelize = require('./SQLITE3DB/database')

export class Server{

    public app: express.Application = express()


    constructor(){

        this.setConfigurations()

        this.setRoutes()

        this.error404Handler()

        this.handleErrors()
    }

    setConfigurations(){
        //connect db
        this.connectSQLITE3()
        this.configureBodyParser()
    }

    connectSQLITE3(){
        // const sequelize = new Sqlite3Database()
        
        // console.log(sequlize.createDB())
        // sync({force:true})
        //use above code to restructure the DB. Remeber all data will be flashed
        sequelize.sync().then(()=>{
            console.log('DB is ready!')
        })
    }

    configureBodyParser(){
        
        // this.app.use(bodyParser.urlencoded({extended:true}))
        this.app.use(express.json())
    }

    setRoutes(){
        this.app.use('/api/user/', UserRouter)
    }

    error404Handler(){
        this.app.use((req,res)=>{
            res.status(404).json({
                message:'Not found',
                status_code:404
            })
        })
    }

    handleErrors(){
        this.app.use((error,req,res,next)=>{
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something went wrong. Please Try Again!',
                status_code: errorStatus
            })
        })
    }


}