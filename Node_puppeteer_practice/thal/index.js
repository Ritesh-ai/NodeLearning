const puppeteer = require('puppeteer');
const CREDS = require('../creds');

async function run() {
//   const browser = await puppeteer.launch();
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    const USERNAME_SELECTOR = '#login_field';
    const PASSWORD_SELECTOR = '#password';
    const BUTTON_SELECTOR = '#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block';

    
    // await page.goto('https://github.com');
    await page.goto('https://github.com/login');
    // await page.screenshot({ path: 'screenshots/github.png' });

    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(CREDS.username);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(CREDS.password);

    await page.click(BUTTON_SELECTOR);

    // await page.waitForNavigation();
  
    const searchUrl = 'https://github.com/search?q=john&type=Users&utf8=%E2%9C%93';
        
    await page.goto(searchUrl);
    await page.waitFor(2*1000);
    // #user_search_results > div.user-list > div:nth-child(1) > div.d-flex.flex-auto > div > a > em
    // const LIST_USERNAME_SELECTOR = '#user_search_results > div.user-list > div:nth-child(INDEX) > div.d-flex > div > a';
    
    const LIST_USERNAME_SELECTOR = '#user_search_results > div.user-list > div:nth-child(INDEX) > div.d-flex.flex-auto > div > a';
    const LIST_EMAIL_SELECTOR = '#user_search_results > div.user-list > div:nth-child(INDEX) > div.d-flex.flex-auto > div > ul > li:nth-child(2) > a';
    
    const LENGTH_SELECTOR_CLASS = 'user-list-item';
    
    let listLength = await page.evaluate((sel) => {
        return document.getElementsByClassName(sel).length;
      }, LENGTH_SELECTOR_CLASS);


      for (let i = 1; i <= listLength; i++) {
          console.log(i);
        // change the index to the next child
        let usernameSelector = LIST_USERNAME_SELECTOR.replace("INDEX", i);
        console.log(usernameSelector);
        // let emailSelector = LIST_EMAIL_SELECTOR.replace("INDEX", i);
        console.log("--------------------------------");
        let username = await page.evaluate((sel) => {
            console.log(sel);
            console.log(document.querySelector(sel))
            console.log("---------------");
            return document.querySelector(sel).getAttribute('href').replace('/', '');
          }, usernameSelector);
    
        // let email = await page.evaluate((sel) => {
        //     let element = document.querySelector(sel);
        //     return element? element.innerHTML: null;
        //   }, emailSelector);
    
        // // not all users have emails visible
        // if (!email)
        //   continue;
    
        // console.log(username, ' -> ', email);
        console.log(username)
    
        // TODO save this user
    }
    
    await page.screenshot({ path: 'screenshots/github.png' });
    // browser.close();
}

run();