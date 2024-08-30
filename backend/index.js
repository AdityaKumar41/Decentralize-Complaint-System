const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routers/app");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use(router);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
