import { Router } from "express"
import { UserController } from "../controllers/UserController"

export class UserRouter{
    public router: Router

    constructor(){

        this.router = Router({mergeParams: true})

        this.getRoutes()

        this.postRoutes()

        this.patchRoutes()

        this.deleteRoutes()

    }
    getRoutes(){
        this.router.get('/createSurvey',UserController.createSurvey)

        this.router.get('/getCandidateBySurveyLink', UserController.getCandidateBySurveyLink)

        this.router.get('/getAllTraits',UserController.getAllTraits)

        this.router.get('/getAllCandidates', UserController.getAllCandidates)

        this.router.get('/getSurveyData', UserController.getSurveyData)

        this.router.get('/getSurveyReport', UserController.getSurveyReport)

        this.router.get('/getAvgRatings', UserController.getAvgRatings)

        this.router.get('/test', UserController.test)
    }

    postRoutes(){
        this.router.post('/createCandidates', UserController.createCandidates)

        this.router.post('/createTraits', UserController.createTraits)

        this.router.post('/findOrCreateRespondent', UserController.findOrCreateRespondent)

        this.router.post('/submitSurvey', UserController.submitSurvey)
    }

    patchRoutes(){

    }

    deleteRoutes(){

    }

}


export default new UserRouter().router