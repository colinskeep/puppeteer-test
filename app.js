const puppeteer = require('puppeteer');
require('dotenv').config();
const emails = process.env.USER_EMAIL.split(',')
for (i = 0; i < emails.length; i++){
    (async () => {
      try{
        const email = emails[i];
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https://accounts.google.com/signin/v2/identifier?hl=en&continue=https%3A%2F%2Fwww.google.com%2F&flowName=GlifWebSignIn&flowEntry=AddSession');
        await page.type('.whsOnd.zHQkBf', email);
        await page.click('div[id="identifierNext"]');
        await page.waitFor(2000);
        await page.type('.whsOnd.zHQkBf', process.env.USER_PW);
        await page.click('div[id="passwordNext"');
      }catch(err){console.log(err)}
    })();
}
