const router = require("express").Router();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

router.post("/", async (req, res) => {
  const email = req.body.email;
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "luxhubcanada@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken,
      },
    });
    const mailOptions = {
      from: "LuxHub <luxhubcanada@gmail.com>",
      to: email,
      subject: "Welcome to LuxHub",
      text: "Thank you for subscribing LuxHub's newsletter. Stay tuned and you won't miss any of those hot releases. ",
      html: "<div>Thank you for subscribing LuxHub's newsletter. Stay tuned and you won't miss any of those hot releases. </div>",
    };

    const result = await transport.sendMail(mailOptions);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
