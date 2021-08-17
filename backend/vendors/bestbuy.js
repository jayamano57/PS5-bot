const {type, dataId, sendEmail} = require('../helpers');
let reloadCounter = 0;

async function bestbuy(page, browser, {
    email,
    firstName, 
    lastName,
    phoneNumber, 
    address1,
    address2, 
    city,
    state,
    zip,
    ccFirstName,
    ccLastName,
    cardNumber,
    ccMonth,
    ccYear,
    cvv,
    ccPhoneNumber
}) {
    try {
        await addToCart(page);
        await checkout(page);
        await deliveryAddress(page, {email, firstName, lastName, phoneNumber, address1, address2, city, state, zip});
        await paymentInfo(page, {ccFirstName, ccLastName, cardNumber, ccMonth, ccYear, cvv, ccPhoneNumber});
        await placeOrder(page);
        await sendEmail(`We got it! A purchase for a ps4 has been successfully placed 🥳. <br> Look out for an email from walmart`, email)
    } catch(err) {
        await sendEmail(`The other bots beat me 😭. <br> Hopefully we can get one next time 🥺`, email)
    } finally {
        await browser.close();
    }
}

async function addToCart(page) {
    if (reloadCounter === 3) {
        await browser.close();
        console.log('quitting after 3 failed attempts');
        return
    }
    try {
        await page.click('.add-to-cart-button');
    } catch(err) {
        reloadCounter++;
        await page.reload();
        addToCart();
    }
}

async function checkout(page) {
    const goToCartSelector = '.go-to-cart-button a';
    const checkoutBtnSelector = '.checkout-buttons__checkout button';
    const checkoutAsGuestSelector = '.cia-guest-content__continue';
    await page.waitForSelector(goToCartSelector);
    await page.click(goToCartSelector);
    await page.waitForSelector(checkoutBtnSelector);
    await page.click(checkoutBtnSelector);
    await page.waitForSelector(checkoutAsGuestSelector);
    await page.click(checkoutAsGuestSelector);
}

async function deliveryAddress(page,{email, firstName, lastName, phoneNumber, address1, city, state, zip}) {
    await page.waitForSelector('.address-form__first-name input'); 
    await type('.address-form__first-name input', page, firstName);
    await type('.address-form__last-name input', page, lastName);
    await page.click('.autocomplete__toggle');
    await type('.line1 input', page, address1);
    await type('.address-form__city input', page, city);
    await page.select('.address-form__state select', state);
    await type('.address-form__zip input', page, zip);
    await type('#user\\.emailAddress', page, email);
    await type('#user\\.phone', page, phoneNumber);
    await page.click('.button--continue button');
}

async function paymentInfo(page, {cardNumber, ccMonth, ccYear, cvv}) {
    await page.waitForSelector('#optimized-cc-card-number'); 
    await type('#optimized-cc-card-number',page, cardNumber);
    await page.select('[name="expiration-month"]', ccMonth);
    await page.select('[name="expiration-year"]', ccYear);
    await type('#credit-card-cvv',page, cvv);
}

async function placeOrder(page) {
    await page.click('.payment__order-summary button');
}

module.exports = {bestbuy};