const express = require ("express")
const MainRouter = require('./routes/index')
const cors = require("cors")
const app = express();
app.use(express.json())
app.use(cors());




app.use("/api/v1",MainRouter)
app.listen(3000);