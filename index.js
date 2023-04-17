const express = require('express')
const cors = require("cors");
const app = express()
const nodemailer = require("nodemailer");

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json());
const port = process.env.PORT || 7000;


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendemail', async(req, res) => {
    const emailFrom = req.body.from;
    const pass = req.body.pass;
    const emailTo = req.body.to;
    const content = req.body.content;
    const htmlContent = req.body.html || "";
    const subjectContent = req.body.subject;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailFrom,
            pass: pass,
        },
        secure: true
    });

    const mailOptions = {
        from: emailFrom,
        to: emailTo,
    };

    await transporter.sendMail({
        ...mailOptions,
        subject: subjectContent,
        text : content,
        html : htmlContent     
    });

    res.send("Email Send!");

})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})