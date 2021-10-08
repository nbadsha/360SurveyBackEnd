// import { Sequelize } from "sequelize";

const sequelize = require('../SQLITE3DB/database')

export class FetchData{

    static getCandidateBySurveyLink(surveyLink){        
        let query =
        `SELECT
                candidates.id AS cand_id,
                candidates.cand_name,
                candidates.job_role,
                candidates.company_name,
                surveys.id AS survey_id,
                surveys.survey_link              
        FROM candidates
        JOIN surveys
        ON candidates.id = surveys.candidateId
        WHERE surveys.survey_link ='`+surveyLink+`'`;
        return new Promise((res,rej)=>{
            res(sequelize.query(query))
        })
    }

    static getSurveyData(){
        let query =
                `SELECT 
                        surveys.id as survey_id,
                        candidates.cand_name,
                        candidates.job_role,
                        COUNT(survey_records.surveyId) AS responses,
                        surveys.survey_link                        
                FROM candidates
                JOIN surveys ON surveys.candidateId=candidates.id
                LEFT JOIN survey_records ON survey_records.surveyId=surveys.id
                GROUP BY 1
                ORDER BY candidates.id ASC`
        return new Promise((res,rej)=>{
            res(sequelize.query(query))
        })
    }

    static getSurveyReport(){
        let query = 
                `SELECT
                        
                        ratings.surveyRecordId,
                        candidates.id AS cand_id,
                        candidates.cand_name AS candidate,
                        respondents.emp_name AS respondent,
                        survey_records.rel_to_cand AS relation,
                        traits.trait_name,
                        ratings.trait_rating
                FROM ratings
                
                LEFT JOIN traits on traits.id=ratings.traitId
                LEFT JOIN candidates on candidates.id=ratings.candidateId
                LEFT JOIN survey_records on survey_records.id=ratings.surveyRecordId
                LEFT JOIN respondents on respondents.id=survey_records.respondentId`
        return new Promise((res,rej)=>{
            res(sequelize.query(query))
        })
    }

    static getAvgRatings(){
        let query = 
            `SELECT
                    
                    ratings.candidateId,
                    candidates.cand_name,
                    traits.trait_name,
                    ROUND(avg(ratings.trait_rating),2) AS average_rating

            FROM ratings

            INNER JOIN traits ON traits.id=ratings.traitId
            INNER JOIN candidates ON candidates.id=ratings.candidateId

            GROUP BY ratings.candidateId, ratings.traitId`
        return new Promise((res,rej)=>{
            res(sequelize.query(query))
        })
    }

    static getTraitNames(){
        let query = 
        `SELECT trait_name FROM traits`
        return new Promise((res,rej)=>{
            res(sequelize.query(query))
        })
    }    



}