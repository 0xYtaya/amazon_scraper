// https://www.amazon.com/dp/B009O0G6DM?th=1&psc=1

const puppeteer = require('puppeteer');
const fs = require('fs');


(async () => {
    let results = JSON.parse(fs.readFileSync('products.json', 'utf8'));
    console.log(results);
    let urls = results.map((p) => `https://www.amazon.com/dp/${p?.asin}?th=1&psc=1`)
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });
    urls.forEach(async (url) => {
        
        const page = await browser.newPage();
        await page.goto(url, {waitUntil: 'networkidle2'});
        const price =  await page.$eval('span[data-a-color="price"] > span[class="a-offscreen"]', el => el.innerText);
        const seller = await page.$eval('#sellerProfileTriggerId', el => el.innerText);
        await page.waitForSelector('.a-section .olp-link-widget')
        await page.click('.a-section .olp-link-widget')
        console.log(price , seller);
    });
})();
