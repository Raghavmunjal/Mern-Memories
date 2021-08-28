import express from 'express'
import mongoose from 'mongoose'
import postRoutes from './routes/posts.js'
import cors from 'cors'
const app = express();

app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb",extended:true}))
// app.use(cors())

app.use('/posts',postRoutes)

const CONNECTION_URL = "mongodb+srv://Raghav04:Raghav04@cluster0.imyun.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
}).then(()=>{
    app.listen(PORT, () =>
    console.log(
      `Server Running mode on port 5000`
    )
  )
}).catch((err)=>{
  console.log(err.message);
})



