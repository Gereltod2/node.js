const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/todos', async (req, res) => {
  const { title } = req.body;
  const todo = await prisma.todo.create({
    data: { title }
  });
  res.json(todo);
});

app.get('/todos', async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

app.get('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await prisma.todo.findUnique({
    where: { id: parseInt(id) }
  });
  res.json(todo);
});

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todo = await prisma.todo.update({
    where: { id: parseInt(id) },
    data: { title, completed }
  });
  res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.todo.delete({
    where: { id: parseInt(id) }
  });
  res.json({ message: 'ustlaa' });
});

app.listen(3000, () => {
  console.log('aslaa');
})