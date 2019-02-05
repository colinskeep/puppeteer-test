const puppeteer = require('puppeteer');
require('dotenv').config();
const emails = process.env.USER_EMAIL.split(',')
for (i = 0; i < 1; i++){
  for (z = 0; z < 5; z++){
    (async () => {
      try{
        const email = emails[i];
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.goto('https://accounts.google.com/signin/v2/identifier?hl=en&continue=https%3A%2F%2Fwww.google.com%2F&flowName=GlifWebSignIn&flowEntry=AddSession');
        await page.type('.whsOnd.zHQkBf', email);
        await page.click('div[id="identifierNext"]');
        await page.waitFor(2000);
        await page.type('.whsOnd.zHQkBf', process.env.USER_PW);
        await page.click('div[id="passwordNext"]');
        await page.waitFor(2000);
        if (page.url().indexOf('https://accounts.google.com/signin/v2/challenge/') > -1){
          console.log('verification needed');
          await page.click('div[class="vdE7Oc"]');
          await page.waitFor(2000);
          await page.type('.whsOnd.zHQkBf', process.env.USER_RECOVERY_EMAIL);
          await page.click('div[class="ZFr60d CeoRYc"]');
          await page.waitFor(2000);
          await page.click('div[class="ZFr60d CeoRYc"]');
        }
        await page.goto('https://www.youtube.com/watch?v=perRLsgWvng');
        await page.waitFor(3000);
        await page.evaluate(() => {
          if (document.querySelector("a.yt-simple-endpoint.style-scope.ytd-toggle-button-renderer").innerHTML.indexOf('aria-pressed="true"') == -1 ){
            document.querySelector("a.yt-simple-endpoint.style-scope.ytd-toggle-button-renderer").click()
          }
          else(console.log("not found"))
        });
        await page.close();
        await browser.close();
      }catch(err){console.log(err)}
    })();
  }
}
