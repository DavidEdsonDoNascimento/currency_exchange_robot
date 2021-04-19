const express = require('express')
const bodyParser = require('body-parser')
//const consign = require('consign')
const puppeteer = require('puppeteer');
const cors = require('cors')


const app = express()
app.use(bodyParser.json())   
//consign().include('controllers').into(app)
app.use(cors({ origin: true, credentials: true }))
app.get('/', function(req, res){
    robot(res)
    
})

app.listen(3200)

async function robot(res)
{
    //dava pra utilizar essa API: http://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL, mas a ideia é fazer com o robo mesmo
    const originCurrency = 'dolar'
    const targetCurrency = 'real'

    const route = `https://www.google.com/search?q=${originCurrency}+para+${targetCurrency}&oq=${originCurrency}+para+${targetCurrency}&aqs=chrome..69i57j0j0i10i433j0i10l2j0j0i10j0j0i10l2.4309j1j7&sourceid=chrome&ie=UTF-8`
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(route)
    
    // Get the "viewport" of the page, as reported by the page.
    const result = await page.evaluate(() => {
        return document.querySelector('.a61j6').value
    })
    
    await browser.close()
    res.json({ dolar_today: result, euro_today: null, libra_today: null })
}
