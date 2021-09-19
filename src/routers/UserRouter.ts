import { Router } from "express"
import { UserController } from "../controllers/UserController"

export class UserRouter{
    public router: Router

    constructor(){

        this.router = Router()

        this.getRoutes()

        this.postRoutes()

        this.patchRoutes()

        this.deleteRoutes()

    }
    getRoutes(){
        this.router.get('/createSurvey',)
    }

    postRoutes(){
        this.router.post('/createCandidates', UserController.createCandidates)
        this.router.post('/createTraits', UserController.createTraits)
    }

    patchRoutes(){

    }

    deleteRoutes(){

    }

}


export default new UserRouter().router