const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

let login = false;
let crawl = false;
let screenshot = true;
if(login) {  // login
    (async () => {
        const browser = await puppeteer.launch({ headless: false })
        const page = await browser.newPage()
        await page.setViewport({
          width: 1200,
          height: 900
        })
        const config = require('./config.json')
        await page.goto('https://www.techrum.vn/login')
        const emailField = await page.$('input[name=login]')
        await emailField.type(config.username) //focus,dispose, ...
        const passwordField = await page.$('input[name=password]')
        await passwordField.type(config.password)
        const loginButton = await page.$('.formSubmitRow-controls button')
        await loginButton.click()
        await page.waitForNavigation('https://www.techrum.vn/')
      })()
}


if(crawl) {  // crawl
    (async () => {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto('https://www.techrum.vn/forums/tin-t-c-thong-tin-chung-danh-cho-bqt.210/')
        let result = await page.evaluate(async () => {
            let items = document.querySelectorAll('.structItem-title a')
            let links = []
            items.forEach((item) => {
              links.push({
                title: item.innerText,
                url: item.getAttribute('href'),
              })
            })
            return links;
          });
        console.log('result', result)
      })()
}

if(screenshot) {
    (async() => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.emulate(devices['iPhone 6']);
        await page.goto('https://news.zing.vn/novaland-million-dollar-club-ra-mat-2-chuyen-vien-bds-cap-cao-dau-tien-post1030979.html');
        await page.screenshot({path: './uploads/full.png', fullPage: true}); 
        await browser.close();
      })();
}
