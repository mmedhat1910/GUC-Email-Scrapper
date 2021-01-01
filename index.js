const puppeteer = require('puppeteer');
const prompt = require('prompt');
require('dotenv').config();

prompt.start();

const username = process.env.USERNAME;
const password = process.env.PASSWORD;
let main = async () => {
    console.log('Waiting...')
	const browser = await puppeteer.launch({ headless: true, defaultViewport: null });
	const page = await browser.newPage();
	await page.goto(
        'https://mail.guc.edu.eg/owa/auth/logon.aspx?replaceCurrent=1&url=https%3a%2f%2fmail.guc.edu.eg%2fowa%2f',
        {waitUntil:'networkidle2'}
	);
    await page.focus('#username');
    await page.keyboard.type(process.env.USERNAME);
	await page.focus('#password');
    await page.keyboard.type(process.env.PASSWORD);
    await page.click('.btn');
    await page.waitForXPath('//*[@id="spnFldrNm"]');
    await page.waitForSelector('span[id=spnCV]');
    let data = await page.evaluate(()=>{
        return document.querySelector('span[id=spnCV]').innerText;

    });
    let num = parseInt(data)
    if(num!= 0){
        console.log(`You have ${num} unread emails`)
    }
    await browser.close();
};
main();



// while()