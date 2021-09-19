const Candidate      = require('./candidate')

const Trait          = require('./trait')

const Rating         = require('./rating')

const Survey         = require('./survey')

const SurveyRecord   = require('./survey_record')

const Respondent     = require('./respondent')


Candidate.hasOne(Survey,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Survey.hasMany(SurveyRecord,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Survey.hasMany(Rating,{
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
