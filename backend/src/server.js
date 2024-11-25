const express = require('express');
const todosRoutes = require("./todos.routes");
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(todosRoutes);


app.listen(3333, () => console.log("Server is running on port 3333"));