const express = require('express')
const cors = require("cors");
const app = express()
const nodemailer = require("nodemailer");
const multer = require('multer');
const fs = require('fs');

const upload = multer();
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

app.post('/sendemail', upload.single('file'), async (req, res) => {
    try {
        // console.log(req.file.buffer);
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
            text: content,
            html: htmlContent      
        });

        res.send("Email Send!");

    } catch (error) {
        res.status(500).send(error);
    }

})

app.post("/upload", upload.single('file'), async (req, res) => {
    console.log(req.file);
    // console.log(req.file.buffer);
    res.send("done");
})

app.post("/attachmentMail", upload.single('file'), async (req, res) => {
    try {
        // console.log(req.file.buffer);
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
            text: content,
            html: htmlContent,
            attachments: [
                {
                    filename: req.file.originalname,
                    content: req.file.buffer
                }
            ]
        });

        res.send("Email Send!");

    } catch (error) {
        res.status(500).send(error);
    }
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})