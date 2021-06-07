const express = require('express')
const router = express.Router()

const serviceName = 'Apply for a large grant for a water resource management project'

console.log('Service name: ' + serviceName)

router.get('/start', function (req, res) {
  // =================================
  req.session.data.COMPLETED = false
  // =================================

  var nextUrl = 'farming-type'

  res.render('./' + req.originalUrl, {
    nextUrl
  })
})

router.get('/farming-type', function (req, res) {
  var backUrl = 'start'
  var nextUrl = 'farming-type-answer'
  var completedUrl = 'farming-type-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.get('/farming-type-answer', function (req, res) {
  var farmingType = req.session.data['farming-type']
  var farmingTypeOther = req.session.data['farming-type-other-options']

  if (!!farmingType && farmingType === 'Something else') {
    res.redirect('farming-type-fail')
  }
  if (!!farmingType && farmingType === 'no' && !!farmingTypeOther) {
    if (farmingTypeOther === 'something else') {
      res.redirect('farming-type-fail')
    } else {
      farmingType = 'no: [' + farmingTypeOther + ']'
    }
  }

  req.session.data['summary-farming-type'] = farmingType
  res.redirect('legal-status')
})

router.get('/farming-type-answer-completed', function (req, res) {
  var farmingType = req.session.data['farming-type']
  var farmingTypeOther = req.session.data['farming-type-other-options']

  if (!!farmingType && farmingType === 'Something else') {
    res.redirect('farming-type-fail')
  }

  if (!!farmingType && farmingType === 'no' && !!farmingTypeOther) {
    if (farmingTypeOther === 'something else') {
      res.redirect('farming-type-fail')
    } else {
      farmingType = 'no: [' + farmingTypeOther + ']'
    }
  }

  req.session.data['summary-farming-type'] = farmingType
  res.redirect('answers')
})

// Q: LEGAL STATUS

router.get('/legal-status', function (req, res) {
  var backUrl = 'farming-type'
  var nextUrl = 'legal-status-answer'
  var completedUrl = 'legal-status-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/legal-status-answer', function (req, res) {
  var legalStatus = req.session.data['legal-status']

  if (legalStatus === 'None') { res.redirect('legal-status-fail') } else { res.redirect('country') }
})

router.post('/legal-status-answer-completed', function (req, res) {
  var legalStatus = req.session.data['legal-status']

  if (legalStatus === 'None') { res.redirect('legal-status-fail') } else { res.redirect('answers') }
})

// Q : Country

router.get('/country', function (req, res) {
  var backUrl = 'legal-status'
  var nextUrl = 'country-answer'
  var completedUrl = 'country-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/country-answer', function (req, res) {
  var country = req.session.data.country
  var postcode = req.session.data.postcode

  if (!!country && country === 'yes') {
    if (!!postcode && postcode.length > 0) {
      country = 'yes: [ Postcode: ' + postcode + ' ]'
    }

    req.session.data['summary-country'] = country
    res.redirect('project-start')
  } else {
    res.redirect('country-fail')
  }
})

router.post('/country-answer-completed', function (req, res) {
  var country = req.session.data.country
  var postcode = req.session.data.postcode

  if (!!country && country === 'yes') {
    if (!!postcode && postcode.length > 0) {
      country = 'yes: [ Postcode: ' + postcode + ' ]'
    }

    req.session.data['summary-country'] = country
    res.redirect('answers')
  } else {
    res.redirect('country-fail')
  }
})

// PROJECT START

router.get('/project-start', function (req, res) {
  var backUrl = 'country'
  var nextUrl = 'project-start-answer'
  var completedUrl = 'project-start-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/project-start-answer', function (req, res) {
  var projectStart = req.session.data['project-start']

  if (projectStart === 'project work') { res.redirect('project-start-fail') } else { res.redirect('tenancy') }
})

router.post('/project-start-answer-completed', function (req, res) {
  var projectStart = req.session.data['project-start']

  if (projectStart === 'project work') { res.redirect('project-start-fail') } else { res.redirect('answers') }
})

// Q: Tenancy

router.get('/tenancy', function (req, res) {
  var backUrl = 'project-start'
  var nextUrl = 'tenancy-answer'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/tenancy-answer', function (req, res) {
  var tenant = req.session.data.tenancy

  if (tenant === 'Yes') {
    res.redirect('project-items')
  } else { res.redirect('tenancy-length') }
})

router.post('/tenancy-length-answer', function (req, res) {
  var tenancyLength = req.session.data['tenancy-length']

  if (tenancyLength === 'No') { res.redirect('tenancy-length-condition') } else { res.redirect('project-items') }
})

router.post('/tenancy-length-answer-completed', function (req, res) {
  res.redirect('answers')
})

router.get('/project-items', function (req, res) {
  var backUrl = 'tenancy-length'
  var nextUrl = 'project-cost'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.get('/project-cost', function (req, res) {
  req.session.data.currentProjectCost = req.session.data['project-cost']

  var backUrl = 'project-items'
  var nextUrl = 'project-cost-answer'
  var completedUrl = 'project-cost-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/project-cost-answer', function (req, res) {
  var projectCost = req.session.data['project-cost']

  if (projectCost < 87500) { res.redirect('project-cost-fail') } else { res.redirect('grant') }
})

router.post('/project-cost-answer-completed', function (req, res) {
  var projectCost = req.session.data['project-cost']

  if (projectCost < 87500) { res.redirect('project-cost-fail') } else { res.redirect('answers') }
})

router.get('/grant', function (req, res) {
  var backUrl = 'project-cost'
  var nextUrl = 'remaining-costs'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// Q: remaining costs

router.get('/remaining-costs', function (req, res) {
  var backUrl = 'grant'
  var nextUrl = 'remaining-costs-answer'
  var completedUrl = 'remaining-costs-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/remaining-costs-answer', function (req, res) {
  var remainingCosts = req.session.data['remaining-costs']

  if (remainingCosts === 'no') { res.redirect('remaining-costs-fail') } else { res.redirect('planning-permission') }
})

router.post('/remaining-costs-answer-completed', function (req, res) {
  var remainingCosts = req.session.data['remaining-costs']

  if (remainingCosts === 'no') { res.redirect('remaining-costs-fail') } else { res.redirect('answers') }
})

// PLANNING PERMISSION

router.get('/planning-permission', function (req, res) {
  // var planningPermission = req.session.data['planning-permission']
  var backUrl = 'remaining-costs'
  var nextUrl = 'planning-permission-answer-completed'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// PLANNING PERMISSION CONDITION
router.get('/planning-required-condition', function (req, res) {
  var backUrl = 'planning-permission'
  var nextUrl = 'abstraction-licence'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl
  })
})

// PLANNING PERMISSION COMPLETED
router.post('/planning-permission-answer-completed', function (req, res) {
  var planningPermission = req.session.data['planning-permission']
  if (planningPermission === 'Not needed' || planningPermission === 'Secured') { res.redirect('abstraction-licence') } else if (planningPermission === 'maybe') { res.redirect('planning-required-condition') } else { res.redirect('planning-permission-fail') }
})

// ABSTRACTION LICENCE

router.get('/abstraction-licence', function (req, res) {
  var planningPermission = req.session.data['planning-permission']
  var nextUrl = 'abstraction-licence-answer-completed'
  var backUrl
  var completedUrl = 'answers'
  if (planningPermission === 'Not needed' || planningPermission === 'Secured') { backUrl = 'planning-permission' } else if (planningPermission === 'maybe') { backUrl = 'planning-required-condition' } else { backUrl = 'planning-permission-fail' }

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// ABSTRACTION LICENCE COMPLETED

router.post('/abstraction-licence-answer-completed', function (req, res) {
  var abstractionLicence = req.session.data['abstraction-licence']
  if (abstractionLicence === 'Not needed' || abstractionLicence === 'Secured') { res.redirect('water-SSSI') } else { res.redirect('abstraction-required-condition') }
})

// ABSTRACTION LICENCE CONDITION
router.get('/abstraction-required-condition', function (req, res) {
  var backUrl = 'abstraction-licence'
  var nextUrl = 'water-SSSI'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl
  })
})

// Water SSSI

router.get('/water-SSSI', function (req, res) {
  var abstractionLicence = req.session.data['abstraction-licence']
  var nextUrl = 'project-summary'
  var backUrl
  var completedUrl = 'answers'
  if (abstractionLicence === 'Not needed' || abstractionLicence === 'Secured') { backUrl = 'abstraction-licence' } else { backUrl = 'abstraction-required-condition' }

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// project-summary

router.get('/project-summary', function (req, res) {
  var backUrl = 'water-SSSI'
  var nextUrl = 'irrigated-crops'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// irrigated-crops

router.get('/irrigated-crops', function (req, res) {
  var backUrl = 'project-summary'
  var nextUrl = 'current-irrigating'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// current irrigating

router.get('/current-irrigating', function (req, res) {
  var backUrl = 'irrigated-crops'
  var nextUrl = 'irrigated-completed-answer'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl
  })
})

router.get('/irrigated-completed-answer', function (req, res) {
  var currentIrrigating = req.session.data['current-irrigating']
  if (currentIrrigating === 'Yes') { res.redirect('irrigated-land') } else { res.redirect('irrigated-land-no') }
})

// Yes - irrigated-land

router.get('/irrigated-land', function (req, res) {
  var backUrl = 'current-irrigating'
  var nextUrl = 'irrigation-water-source'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// No - irrigated-land

router.get('/irrigated-land-no', function (req, res) {
  var backUrl = 'current-irrigating'
  var nextUrl = 'irrigation-water-source-no'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// Yes -  irrigation-water-source

router.get('/irrigation-water-source', function (req, res) {
  req.session.data.tempIrrigationAnswer = req.session.data.irrigationAnswer
  var backUrl = 'irrigated-land'
  var nextUrl = 'irrigation-water-source-answer'
  var completedUrl = 'irrigation-water-source-answer-completed'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

router.post('/irrigation-water-source-answer', function (req, res) {
  res.redirect('irrigation-systems')
})

router.post('/irrigation-water-source-answer-completed', function (req, res) {
  res.redirect('answers')
})

// No - irrigation - water - source

router.get('/irrigation-water-source-no', function (req, res) {
  var backUrl = 'irrigated-land-no'
  var nextUrl = 'irrigation-systems-no'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// Yes - irrigation-systems

router.get('/irrigation-systems', function (req, res) {
  var backUrl = 'irrigation-water-source'
  var nextUrl = 'productivity'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// No - irrigation - systems

router.get('/irrigation-systems-no', function (req, res) {
  var backUrl = 'irrigation-water-source-no'
  var nextUrl = 'productivity'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// productivity
router.get('/productivity', function (req, res) {
  var data = req.session.data['current-irrigating']
  var backUrl
  var nextUrl = 'collaboration'
  var completedUrl = 'answers'
  if (data === 'Yes') { backUrl = 'irrigation-systems' } else { backUrl = 'irrigation-systems-no' }

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// collaboration

router.get('/collaboration', function (req, res) {
  var backUrl = 'productivity'
  var nextUrl = 'answers'
  var completedUrl = 'answers'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// answers

router.get('/answers', function (req, res) {
  req.session.data.COMPLETED = true

  var backUrl = 'collaboration'
  var nextUrl = 'next-steps'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl
  })
})

// next-steps

router.get('/next-steps', function (req, res) {
  var backUrl = 'answers'
  var nextUrl = 'business'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl
  })
})

// business

router.get('/business', function (req, res) {
  if (req.session.data.water_s03_status !== 'Completed') {
    req.session.data.water_s03_status = 'In progress'
    req.session.data.water_s03_status_class = 'govuk-tag--blue'
  }

  var nextUrl = 'applying'
  var backUrl = 'next-steps'
  var completedUrl = 'check-details'

  // if (req.session.data.water_s03_status === 'Completed') {
  // backUrl = "check-answers-contact-details"
  // }

  res.render('./' + req.originalUrl, {
    nextUrl,
    backUrl,
    completedUrl
  })
})

// applying

router.post('/applying-answer', function (req, res) {
  res.redirect('your-details')
})

router.get('/your-details', function (req, res) {
  var nextUrl = 'check-details'
  var backUrl = 'applying-answer'
  var completedUrl = 'check-details'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl,
    completedUrl
  })
})

// check-details

router.get('/check-details', function (req, res) {
  // req.session.data.COMPLETED = true
  var nextUrl = 'consent'
  var backUrl = 'your-details'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl
  })
})

router.get('/agent-farmer-details', function (req, res) {
  var nextUrl = 'check-details'
  var backUrl = 'your-details'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl
  })
})

// consent

router.get('/consent', function (req, res) {
  var nextUrl = 'reference-number'
  var backUrl = 'check-details'

  res.render('./' + req.originalUrl, {
    backUrl,
    nextUrl
  })
})

// reference-number

router.get('/reference-number', function (req, res) {
  var backUrl = 'consent'

  res.render('./' + req.originalUrl, {
    backUrl: backUrl
  })
})

router.get('/survey', function (req, res) {
  req.session.data.water_completed_sections = '3'

  req.session.data.water_s03_status = 'Completed'
  req.session.data.water_s03_status_class = ''

  res.render('./' + req.originalUrl, {
    // backUrl: res.locals.prevURL
  })
})

router.get('/email', function (req, res) {
  res.render('./' + req.originalUrl, {
    // backUrl: res.locals.prevURL
  })
})

module.exports = router
