const PORT = 8000;
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

app.use(cors());
app.get("/todos/:userEmail", async (req, res) => {
  const { userEmail } = req.params;
  try {
    const todos = await pool.query(
      "SELECT * FROM todos WHERE user_email = $1",
      [userEmail]
    );
    res.json(todos.rows);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
