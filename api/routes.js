'use strict'

const controller = require('./controller')

module.exports = function(app){
  app.route('/scraping')
    .get(controller.scraping)
}