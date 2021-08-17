const {type, dataId, sendEmail} = require('../helpers');
let reloadCounter = 0;

async function walmart(page, browser, {
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
        await deliveryOptions(page);
        await deliveryAddress(page, {email, firstName, lastName, phoneNumber, address1, address2, city, state, zip});
        await paymentInfo(page, {ccFirstName, ccLastName, cardNumber, ccMonth, ccYear, cvv, ccPhoneNumber});
        await placeOrder(page);
        sendEmail(`We got it! A purchase for a ps4 has been successfully placed 🥳. <br> Look out for an email from walmart`, email)
    } catch(err) {
        sendEmail(`The other bots beat me 😭. <br> Hopefully we can get one next time 🥺`, email)
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
        await page.click('.prod-ProductCTA--primary');
    } catch(err) {
        reloadCounter++;
        await page.reload();
        addToCart();
    }
}

async function checkout(page) {
    const checkoutBtnSelector = '[data-automation-id="pac-pos-proceed-to-checkout"]';
    const checkoutAsGuestSelector = '[data-automation-id="new-guest-continue-button"]';
    await page.waitForSelector(checkoutBtnSelector);
    await page.click(checkoutBtnSelector);
    await page.waitForSelector(checkoutAsGuestSelector);
    await page.click(checkoutAsGuestSelector);
}

async function deliveryOptions(page) {
    const continueToAddressSelector = '[data-automation-id="fulfillment-continue"]';
    await page.waitForSelector(continueToAddressSelector);
    await page.click(continueToAddressSelector);
}

async function deliveryAddress(page,{email, firstName, lastName, phoneNumber, address1, address2, city, state, zip}) {
    await page.waitForSelector(dataId('address-form-firstName')); 
    await type(dataId('address-form-firstName'), page, firstName);
    await type(dataId('address-form-lastName'), page, lastName);
    await type(dataId('address-form-shippingPhone'), page, phoneNumber);
    await type(dataId('address-form-shippingEmail'), page, email);
    await type(dataId('address-form-addressLineOne'), page, address1);
    await type(dataId('address-form-city'), page, city);
    await page.select(dataId('address-form-state'), state);
    await type(dataId('address-form-postalCode'), page, zip);
    await page.click(dataId('address-book-action-buttons-on-continue'));
}

async function paymentInfo(page, {ccFirstName, ccLastName, cardNumber, ccMonth, ccYear, cvv, ccPhoneNumber}) {
    await page.waitForSelector(dataId('firstName-cc')); 
    await type(dataId('firstName-cc'),page, ccFirstName);
    await type(dataId('lastName-cc'),page, ccLastName);
    await type(dataId('cardNumber-cc'),page, cardNumber);
    await page.select(dataId('expiryMonth-cc'), ccMonth);
    await page.select(dataId('expiryYear-cc'), ccYear);
    await type(dataId('cvv-verify-cc'),page, cvv);
    await type(dataId('phone-cc'),page, ccPhoneNumber);
    await page.click(dataId('save-cc'))
}

async function placeOrder(page) {
    await page.waitForSelector(dataId('summary-place-holder'));
    await page.click(dataId('summary-place-holder'));
}

module.exports = {walmart};