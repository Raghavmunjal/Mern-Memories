import express from 'express'
import mongoose from 'mongoose'
import postRoutes from './routes/posts.js'
import dotenv from 'dotenv'
import cors from 'cors'

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb",extended:true}))

app.use('/posts',postRoutes)

const PORT = process.env.PORT 

mongoose.connect(process.env.CONNECTION_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
}).then(()=>{
    app.listen(PORT, () =>
    console.log(
      `Server Running mode on ${PORT}`
    )
  )
}).catch((err)=>{
  console.log(err.message);
})



