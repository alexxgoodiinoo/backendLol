const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const v1ChampRouter = require("./v1/routes/champRoutes");

const app = express()
app.use(cors());
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());
app.use("/api/v1/champs", v1ChampRouter);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))