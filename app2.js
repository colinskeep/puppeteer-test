const puppeteer = require('puppeteer');
require('dotenv').config();

try {
  (async (arr2) => {
    for (let z = 0; z < arr2.length; z++){
      const browser = await puppeteer.launch({
        headless: false, // launch headful mode
      });
      const page = await browser.newPage();
      await page.goto('https://accounts.google.com/signin/v2/identifier?hl=en&continue=https%3A%2F%2Fwww.google.com%2F&flowName=GlifWebSignIn&flowEntry=AddSession');
      await page.type('.whsOnd.zHQkBf', arr2[z].email);
      await page.click('div[id="identifierNext"]');
      await page.waitFor(2000);
      await page.type('.whsOnd.zHQkBf', arr2[z].password);
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
      console.log('logged in: ', arr2[z].email)
      await page.goto('https://www.youtube.com/channel_switcher');
      console.log('checking brand accounts.....')
      await page.waitFor(2000);
      const hrefs = await page.$$eval('a', as => as.map(a => a.href));
      console.log(hrefs)
      let arr = [];
      for (let i = 0; i < hrefs.length; i++) {
        if (hrefs[i].indexOf('pageid') > -1) {
          arr.push(hrefs[i]);
          }
          if (i == hrefs.length - 1) {
            console.log('found ',arr.length, 'brand accounts for', arr2[z].email);
            if (arr.length == 0 ){
              await page.waitFor(2000);
              await page.goto(`https://www.youtube.com/watch?v=perRLsgWvng`)
              await page.waitFor(2000);
              await page.evaluate(() => {
                if (document.querySelector("a.yt-simple-endpoint.style-scope.ytd-toggle-button-renderer").innerHTML.indexOf('aria-pressed="true"') == -1 ){
                  document.querySelector("a.yt-simple-endpoint.style-scope.ytd-toggle-button-renderer").click()
                }
              })
              await browser.close();
            } else {for (let x = 0; x < arr.length; x++) {
              await page.goto(arr[x]);
              await page.waitFor(2000);
              if (page.url().indexOf('https://accounts.google.com/signin/v2/') > -1) {
                await page.waitFor(2000);
                await page.type('.whsOnd.zHQkBf', arr2[z].password);
                await page.click('div[id="passwordNext"]');
              }
              await page.waitFor(2000);
              await page.goto(`https://www.youtube.com/watch?v=perRLsgWvng`)
              await page.waitFor(2000);
              await page.evaluate(() => {
                if (document.querySelector("a.yt-simple-endpoint.style-scope.ytd-toggle-button-renderer").innerHTML.indexOf('aria-pressed="true"') == -1 ){
                  document.querySelector("a.yt-simple-endpoint.style-scope.ytd-toggle-button-renderer").click()
                }
                else(console.log("not found"))
              })
              if (x == arr.length - 1) {
                await browser.close();
              }
            }
            }
        }
      }
    }

  })([{email: 'bankers.schedule43@gmail.com', password: 'easypass123'}, {email: 'bankers.schedule11@gmail.com', password: 'trollman123'}])
} catch (err) { console.log(err) }
