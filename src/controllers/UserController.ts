import { Helpers } from "../helpers/Helpers"
import { FetchData } from "../helpers/fetchData"

const model_relationships = require('../models/ModelRelationships')
const Candidate = require('../models/Candidate')
const Trait = require('../models/Trait')
const Survey = require('../models/Survey')
const SurveyRecord = require('../models/SurveyRecord')
const Respondent = require('../models/Respondent')
const Rating = require('../models/Rating')
const sequelize = require('../SQLITE3DB/database')


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
        const candidates = await Candidate.bulkCreate(req.body.data,{validator:true})        
        console.log(candidates.length)
        console.log(req.body.data)
        res.send(req.body.data)
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
        try {
            const traits = await Trait.bulkCreate(req.body.data,{validator:true})            
            console.log(req.body.data)
            res.send(traits)
        } catch (error) {
            console.log(error.message)
            res.send(error.message)
        }
    }

    static async getAllCandidates(req,res){
        try {
            const candidates = await Candidate.findAll()
            // console.log(candidates)
            res.send(candidates)
        } catch (error) {
            res.send(error)
        }
    }

    static  async getAllTraits(req,res){
        try {
            const traits = await Trait.findAll()
            // console.log(traits)
            res.send(traits)
        } catch (error) {
            res.send(error)
        }
    }

    static async createSurvey(req,res){
        //1. Take all the employee ids
        //2. Make a hash code of length 6
        //3. Save it to Survey model
        //4. Send the Survey model data.

        const candidates = await Candidate.findAll();
        const survey_links = Helpers.createRandomLink(6,candidates.length)
        const surveyData = Helpers.createSurveyData(survey_links,candidates)
        Survey.bulkCreate(surveyData)
        // console.log(candidates)
        FetchData.getSurveyData().then((result)=>{
            res.send(result[0])
        })
    }

    static async getSurveyData(req,res){
        FetchData.getSurveyData().then((result)=>{
            res.send(result[0])
        })
    }

    static isEligibleForSurvey(){

    }

    static async getCandidateBySurveyLink(req,res){
        let surveyLink = req.query.survey_link
        FetchData.getCandidateBySurveyLink(surveyLink).then((result)=>{
            console.log(result)
            res.send(result[0])
        })
    }

    static async findOrCreateRespondent(req,res){
        let data = req.body.data
        console.log(req.body.data)
        
        await Respondent.findOrCreate(
            {
                where:{emp_id:data.emp_id},
                defaults:{
                    emp_name:data.emp_name,
                    department:data.department,
                    relation_to_cand:data.relation_to_cand
                }
            }
        )
        .then(function(emp,created){
            res.send(emp)            
        })       
    }

    static async submitSurvey(req,res){
        console.log(req.body.data)
        const data = req.body.data
        try {

            const result = await sequelize.transaction(async (t) => {
          
              const surveyRecord = await SurveyRecord.create({
                rel_to_cand: data.rel_to_cand,
                surveyId: data.candidate.survey_id,
                respondentId: data.respondent.id
              }, { transaction: t });              
              const survey_record_id = surveyRecord.dataValues.id
              let ratingsData = []
              data.surveyRatings.map((e)=>{                
                  ratingsData.push({
                      traitId:e.traitId,
                      trait_rating:e.trait_rating,
                      surveyRecordId:survey_record_id,
                      candidateId:e.candidateId
                  })
              })
              await Rating.bulkCreate(ratingsData,{transaction:t})         
              
          
            });
          
            // If the execution reaches this line, the transaction has been committed successfully
            // `result` is whatever was returned from the transaction callback (the `user`, in this case)
          
          } catch (error) {
          
            // If the execution reaches this line, an error occurred.
            // The transaction has already been rolled back automatically by Sequelize!
          
          }
    }

    static async getSurveyReport(req,res){
        FetchData.getSurveyReport().then((result)=>{
            // console.log(result)
            const surveyReport = Helpers.transPoseSurveyReport(result[0])
            FetchData.getTraitNames().then((result)=>{                
                res.send( [surveyReport,result])
            })           
            
        })
    }

    static async getAvgRatings(req,res){
        FetchData.getAvgRatings().then((result1)=>{
            // console.log(res)
            const avgRatings = Helpers.transPoseAvgSurveyReport(result1[0])
            FetchData.getTraitNames().then((result)=>{                
                res.send( [avgRatings,result])
            }) 
        })
    }

    static test(req,res){
        let surveyLink = req.query.survey_link
        // console.log(req)
        // console.log(surveyLink)
        FetchData.getCandidateBySurveyLink(surveyLink).then((result)=>{
            console.log(result)
            res.send(result[0])
        })           
        // res.send({data:surveyLink})
    }



}
