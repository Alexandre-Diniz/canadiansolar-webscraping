'use strict'
const superagent = require('superagent')
const cheerio = require('cheerio')

var controllers = {
  scraping: function (request, response) {
    superagent.get('https://www.portalsolar.com.br/modelos-de-placa-solar.html')
    .end((err, res) => {
      if (err) {
        return console.log(err)
      }
      const $ = cheerio.load(res.text)
      let x = $('.entry-content')
      x = $('h3')
      let cont = 8
      let acm = []
      for (const child in x) {
        try {
          if (parseInt(child) >= 8 && parseInt(child) <= 37) {
            const children = x[child].parent
            cont += 1
            let aux = []
            children.children.map(child => {
              try {
                if (child.name == 'p' && child.children.length > 3) {
                  aux = []
                  child.children.map((item,index) => {
                    if (item.data) {
                      aux.push(item.data)
                    }
                  })
                }
              } catch (err) {
                null
              }
            })
            acm.push({data:aux,modelo:x[child].children[0].data})
          }
        } catch (err) {
          null
        }
      }
      console.log(acm)
      response.json(acm)
      // const text = res.text.split('<a href="/url?q=')
      // const link = text[1].split('&amp')

      // console.log(link[0])
      // response.redirect(link[0])
    })
  },
}

module.exports = controllers