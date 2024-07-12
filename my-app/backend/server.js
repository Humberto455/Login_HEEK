const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const users = [];

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push({ username, password });
  res.status(200).json({ message: 'User registered successfully' });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  if (user.password !== password) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  res.status(200).json({ message: 'Login successful' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
