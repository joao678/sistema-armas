const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Servidor backend rodando." });
});

const db = require("./models");
db.sequelize.sync();


//Dropar tudo e recriar
/*db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});*/


const PORT = process.env.PORT || 8080;

require("./routes/produto.routes.js")(app);
require("./routes/pessoa.routes.js")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});