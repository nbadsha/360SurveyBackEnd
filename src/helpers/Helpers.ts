import * as _ from 'lodash'
import { any } from 'sequelize/types/lib/operators';

export class Helpers {


  static createRandomLink(linkSuffixLength, numberofLinks) {
    let links = []
    let result = "";
    let characters =
      "abcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (let index = 0; index < numberofLinks; index++) {
        for (let i = 0; i < linkSuffixLength; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
          }
        links.push(result)
        result = ""
    }
    return links
  }

  static createSurveyData(links, candidates){
      let surevys = []
      let i = 0
      candidates.forEach(element => {
        surevys.push({survey_link:links[i],candidateId:element.id})
        i++
    });      
      return surevys
  }

  static transPoseSurveyReport(result){
    const uSurvey:Array<any> = _.uniqBy(result,'surveyRecordId')
    let newData = []
    uSurvey.map((ue,i)=>{      
        let uSurveyId = ue.surveyRecordId
        let newSurveyData =
        {
          srno:i+1,
          surveyRecordId: uSurveyId,
          cand_id: ue.cand_id,
          candidate: ue.candidate,
          respondent: ue.respondent,
          relation: ue.relation,
          // trait_ratings:[]
        }
        result.map((r)=>{
          if (uSurveyId===r.surveyRecordId) {
            let traitName = r.trait_name
            let traitRating = r.trait_rating
            // let newJson = {}
            // newJson[traitName]=traitRating
            // newSurveyData.trait_ratings.push(newJson)
            newSurveyData[traitName]=traitRating
          }
        })
    newData.push(newSurveyData)
    })
    console.log(newData)
    return newData
  }

  static transPoseAvgSurveyReport(result){
    const uSurvey:Array<any> = _.uniqBy(result,'candidateId')
    let newData = []    
    uSurvey.map((ue,i)=>{      
        let uCandId = ue.candidateId
        let newSurveyData =
        {
          srno:i+1,
          candidateId: uCandId,
          cand_name: ue.cand_name,
          // trait_ratings:[]
        }
        result.map((r)=>{
          if (uCandId===r.candidateId) {            
            // newSurveyData[r.trait_name] = r.average_rating
            let traitName = r.trait_name
            let traitRating = r.average_rating
            // let newJson = {}
            // newJson[traitName]=traitRating
            // newSurveyData.trait_ratings.push(newJson)
            newSurveyData[traitName]=traitRating
          }
        })
    newData.push(newSurveyData)
    })
    console.log(newData)
    return newData
  }


}
