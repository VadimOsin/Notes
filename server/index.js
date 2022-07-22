const express = require('express')
const userRouter = require('./routes/user.routes')
const postRouter = require('./routes/post.routes')
const authRouter = require('./routes/auth.routes')
const cors = require("cors");
const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json())


const corsOptions = {
    origin: "http://localhost:3000",
};

app.options("*", cors());

app.use(cors(corsOptions));

app.use('/api', userRouter,postRouter,authRouter)

app.listen(PORT, () => console.log(`sever started on port ${PORT}`))