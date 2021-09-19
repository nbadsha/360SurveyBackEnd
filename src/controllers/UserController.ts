const model_relationships = require('../models/model_relationship')
const Candidate = require('../models/candidate')
const Trait = require('../models/trait')



export class UserController{
    static async createCandidates(req,res,next){
        // req.body should be in below format(raw-json)
        // [
        //     {
        //         "cand_name":"Jhon",
        //         "job_role":"Salesman",
        //         "company_name":"XYZ"
        //     },
        //     {
        //         "cand_name":"Harry",
        //         "job_role":"SDE",
        //         "company_name":"XYZ"      
        //     }
        // ]
        const candidates = await Candidate.bulkCreate(req.body)
        console.log(candidates.length)
        console.log(req.body)
        res.send(req.body)
    }
    static async createTraits(req,res,next){
        // req.body should be in below format(raw-json)
        // [
        //     {                
        //         "trait_name": "Ability to learn",
        //         "trait_definition": "Learning ability is about how you learn, apply and consume knowledge to apply. There’s a whole series of courses on learning to learn, to teach yourself how you learn, how to learn, and why you are not learning something."
        //     },
        //     {                
        //         "trait_name": "Accountability",
        //         "trait_definition": "the obligation of an individual or organization to account for its activities, accept responsibility for them, and disclose the results in a transparent manner.” It's simple: to be accountable to a team, a person needs to be clear about what they plan to do"
        //     }
        // ]
        const traits = await Trait.bulkCreate(req.body)
        console.log(traits.length)
        console.log(req.body)
        res.send(req.body)
    }

    static async createSurvey(req,res){
        console.log('CreateSurvey')
    }
}
