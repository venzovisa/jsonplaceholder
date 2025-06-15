import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json()); // For parsing application/json

// [GET] /users
app.get("/users", (req, res) => {
  console.log("GET /users");
  res.json([
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
    },
  ]);
});

// [POST] /posts?userId=id
app.post("/posts", (req, res) => {
  const { userId } = req.query;
  const postData = req.body;
  console.log(`POST /posts?userId=${userId}`, postData);
  res.status(201).json({ message: "Post created", userId, post: postData });
});

// [DELETE] /posts/:id
app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  console.log(`DELETE /posts/${id}`);
  res.status(200).json({ message: `Post ${id} deleted` });
});

// [POST] /posts/:id
app.post("/posts/:id", (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  console.log(`POST /posts/${id}`, updateData);
  res.status(200).json({ message: `Post ${id} updated`, data: updateData });
});

// [GET] /todos
app.get("/todos", (req, res) => {
  console.log("GET /todos");
  res.json([
    { id: 1, userId: 1, title: "delectus aut autem", completed: false },
    {
      id: 2,
      userId: 1,
      title: "quis ut nam facilis et officia",
      completed: true,
    },
  ]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Mock API server is running on http://localhost:${PORT}`);
});
