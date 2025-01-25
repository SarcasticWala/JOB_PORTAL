import express from "express"
import mongoose from "mongoose"

import 'dotenv/config'
import cloudinaryConnect from './config/cloudinary.js'

import authRouter from "./routes/authRoute.js"
import postRouter from "./routes/postRoute.js"
import ProfileRouter from "./routes/profileRoute.js"

import fileUpload from "express-fileupload"
import cookieParser from "cookie-parser"
import cors from 'cors'


const app = express()
const port = 3000


app.use(cookieParser())
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp" }))
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



app.use('/auth', authRouter)
app.use('/post', postRouter)
app.use('/profile', ProfileRouter)


await mongoose.connect(process.env.MONGODB_URL).then(() => console.log("Database Connected")).catch((error) => console.log(error))
cloudinaryConnect();


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/contact-us', async(req, res) => {
  try {
    const formData = req.body;

    const response = await fetch('https://script.google.com/macros/s/AKfycbwsdM0tHG_MKdH2FGguUDQbAdtjhKqdjAK7BZKu9vzBc01wSpPJFMl0_ijsGEoBjSJ7TQ/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      }),
    });

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})