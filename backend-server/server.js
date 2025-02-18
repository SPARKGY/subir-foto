// filepath: /backend-server/server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/get-repo-data', (req, res) => {
  const filePath = path.join(__dirname, 'repos.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read repository data' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.get('/get-github-token', (req, res) => {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'GitHub token not found' });
  }
  res.json({ githubToken: token });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});