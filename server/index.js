const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require('cors')
app.use(cors());

const cardRouter = require("./routes/cards.routes");
const userRouter = require("./routes/users.routes");
const boardRouter = require("./routes/boards.routes");
const listRouter = require("./routes/lists.routes");

app.use("/cards", cardRouter);
app.use("/user", userRouter);
app.use("/boards", boardRouter)
app.use("/lists", listRouter)

app.listen(8000 , () => {
    console.log("Server started!");
});