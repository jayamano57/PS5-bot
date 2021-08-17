const nodemailer = require("nodemailer");

async function type(selector, page, text) {
    await clearInputField(selector, page);
    await await page.type(selector, text);
}

async function clearInputField(selector, page) {
    await page.click(selector, {clickCount: 3});
    await page.keyboard.press('Backspace');
}

function dataId(id) {
    return `[data-automation-id="${id}"]`
};

async function sendEmail(message, email) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODE_EMAIL,
        pass: process.env.NODE_PASS,
      },
    });

    const mailOptions = {
      from: process.env.NODE_EMAIL,
      to: email,
      subject: `Message from Jay's PS5 Bot`,
      html: message,
    };
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Success" }),
    };
}

module.exports = {type, dataId, sendEmail};