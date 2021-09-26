const Candidate      = require('./Candidate')

const Trait          = require('./Trait')

const Rating         = require('./Rating')

const Survey         = require('./Survey')

const SurveyRecord   = require('./SurveyRecord')

const Respondent     = require('./Respondent')


Candidate.hasOne(Survey,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Survey.hasMany(SurveyRecord,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})


Trait.hasMany(Rating,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Respondent.hasMany(SurveyRecord,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

SurveyRecord.hasMany(Rating,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Candidate.hasMany(Rating,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
