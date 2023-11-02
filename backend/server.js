const express = require("express");
const cors= require("cors")
const app = express();
const crudrouter= require("./router/crud")
const loginrouter=require('./router/login')

const db = require('./db');

app.use(cors({origin:'*'}));
app.use(express.json());

app.use("/",crudrouter);
app.use("/api",loginrouter);

const port =process.env.PORT || 3000;
app.listen(port,()=>"server running on port 👍 ");
