const puppeteer = require('puppeteer');
const cron = require('node-cron');
const cors = require('cors')
const express = require('express');
const app = express();
const {walmart} = require('./vendors/walmart');
const {bestbuy} = require('./vendors/bestbuy');
require('dotenv').config()
const {sendEmail} = require('./helpers');

let jobs = [];
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

async function initBrowser(url) {
    const browser = await puppeteer.launch();
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
	await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36');
    await page.goto(url);
    return {page, browser};
}

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get('/api/tasks', function(req, res) {
	res.status(200).send({jobs})
})
app.post('/api/schedule',  async function (req, res) {
	let job;
	let apiSuccessMessage;
	let url;
	const {watcher, vendor, scheduleTime, scheduleDate, email} = req.body;
	if (vendor === 'walmart') {
		// url = 'https://www.walmart.com/ip/Cra-Z-Art-School-Quality-Crayons-24-Count/17094359'; // test url 
		url = 'https://www.walmart.com/ip/Sony-PlayStation-5-Digital-Edition-Video-Game-Consoles/979738052';
	} else if (vendor === 'bestbuy') {
		// url = 'https://www.bestbuy.com/site/animal-island-aila-aila-sit-play-virtual-preschool-learning-system/6439478.p?skuId=6439478' // test url
		url = 'https://www.bestbuy.com/site/sony-playstation-5-digital-edition-console/6430161.p?skuId=6430161'
	}
	const {page, browser} = await initBrowser(url);
	if (watcher === 'true') {
		const date = new Date();
		const currentTime = `${date.getHours()}:${date.getMinutes()}`;
		job = cron.schedule('*/1 * * * *', async () => {
			let addToCartBtn;
			if (vendor === 'walmart') {
				addToCartBtn = await page.$('.prod-ProductCTA--primary');
			} else if (vendor === 'bestbuy') {
				const itemId = page.url().split('=')[1];
				addToCartBtn = await page.$(`[data-sku-id="${itemId}"][data-button-state="ADD_TO_CART"]`)
			}
			if (addToCartBtn) {
				sendEmail(`PS5 is in stock! Check ${url}`, email)
				console.log('in stock')
			} else {
				console.log(`out of stock as of ${currentTime}`)
			}
		})
		apiSuccessMessage = `Jay's bot has been notified and she will do her best to get you a PS5!<br>She will check the availability at ${vendor} <strong>every 30 seconds</strong>`;
		jobs.push(job)
	} else {
		const [year, month, day] = scheduleDate.split('-')
		const [hour, minute] = scheduleTime.split(':')
		job = cron.schedule(`0 ${minute} ${hour} ${day} ${month} *`, () => {
			if (vendor === 'walmart') {
				walmart(page, browser, req.body);
			} else if (vendor === 'bestbuy') {
				bestbuy(page, browser, req.body);
			}
		}, {
			scheduled: true,
			timezone: "America/Los_Angeles"
		});
		jobs.push(job)
		apiSuccessMessage = `Jay's bot has been notified and she will do her best to get you a PS5! <br> <strong>Scheduled for ${month}/${day}/${year} at ${hour}:${minute}</strong>`
	}
	sendEmail(apiSuccessMessage, email)
	res.status(201).send({success: true});
})
app.get('/api/stop',  function (req, res) {
	jobs.forEach(job => {
		job.stop();
		delete job;
	});
	jobs = [];
	res.status(200).send({success: true})
})


