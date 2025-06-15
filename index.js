import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { readData, writeData } from "./utils/utils.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json()); // For parsing application/json

// [GET] /
app.get("/", (req, res) => {
  console.log("GET /");
  res.status(200).send('Server started');
});

// [GET] /users
app.get("/users", async (req, res) => {
  console.log("GET /users");
  const users = JSON.parse(await readData("users"));
  res.json(users);
});

// [GET] /users/:id
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`GET /users/${id}`);
  const users = JSON.parse(await readData("users"));
  const user = users.find((u) => u.id == id);
  res.status(201).json(user);
});

// [PUT] /users/:id
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  console.log(`POST /users/${id}`, updateData);
  const users = JSON.parse(await readData("users"));
  users.forEach((u) => {
    if (u.id == id) {
      u.name = updateData.name || u.name;
      u.username = updateData.username || u.username;
      u.email = updateData.email || u.email;
      u.address = {
        ...u.address,
        ...updateData?.address,
        geo: {
          ...u.address.geo,
          ...updateData?.address?.geo,
        },
      };
      u.phone = updateData.phone || u.phone;
      u.website = updateData.website || u.website;
      u.company = {
        ...u.company,
        ...updateData?.company,
      };
    }
  });
  await writeData("users", users);
  res.status(200).json({ message: `Post ${id} updated`, data: updateData });
});

// [GET] /posts?userId=id
app.get("/posts", async (req, res) => {
  const { userId } = req.query;
  console.log(`GET /posts?userId=${userId}`);
  const posts = JSON.parse(await readData("posts"));
  const filteredPosts = posts.filter((p) => p.userId == userId);
  res.status(201).json(filteredPosts);
});

// [DELETE] /posts/:id
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`DELETE /posts/${id}`);
  const posts = JSON.parse(await readData("posts"));
  const filteredPosts = posts.filter((p) => p.id != id);
  writeData("posts", filteredPosts);
  res.status(200).json({ message: `Post ${id} deleted` });
});

// [PUT] /posts/:id
app.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  console.log(`POST /posts/${id}`, updateData);
  const posts = JSON.parse(await readData("posts"));
  posts.forEach((p) => {
    if (p.id == id) {
      p.title = updateData.title;
      p.body = updateData.body;
    }
  });
  await writeData("posts", posts);
  res.status(200).json({ message: `Post ${id} updated`, data: updateData });
});

// [GET] /todos
app.get("/todos", async (req, res) => {
  console.log("GET /todos");
  const todos = JSON.parse(await readData("todos"));
  res.json(todos);
});

// [PUT] /todos/:id
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  console.log(`POST /posts/${id}`, updateData);
  const todos = JSON.parse(await readData("todos"));
  todos.forEach((t) => {
    if (t.id == id) {
      t.title = updateData.title || t.title;
	  t.completed = updateData.completed;
    }
  });
  await writeData("todos", todos);
  res.status(200).json({ message: `Todo ${id} updated`, data: updateData });
});

// [GET] /reset
app.get("/reset", async (req, res) => {
  console.log("GET /reset");

  const posts = await (
    await fetch("https://jsonplaceholder.typicode.com/posts")
  ).json();
  const users = await (
    await fetch("https://jsonplaceholder.typicode.com/users")
  ).json();
  const todos = await (
    await fetch("https://jsonplaceholder.typicode.com/todos")
  ).json();

  await writeData("posts", posts);
  await writeData("users", users);
  await writeData("todos", todos);

  res.status(200).send("Data reset");
});

// Start server
app.listen(PORT, () => {
  console.log(`Mock API server is running on http://localhost:${PORT}`);
});
