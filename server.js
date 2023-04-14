const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 8000;

app.use(express.json());

app.post('/users', (req, res) => {
  // Get the user data from the request body
  const newUser = req.body;

  // Load existing users from the JSON file
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to read file:', err);
      res.sendStatus(500);
    } else {
      try {
        // Parse the JSON data
        const users = JSON.parse(data);

        // Add the new user to the array of users
        users.push(newUser);

        // Write the updated users array back to the JSON file
        fs.writeFile('db.json', JSON.stringify(users), 'utf8', (err) => {
          if (err) {
            console.error('Failed to write file:', err);
            res.sendStatus(500);
          } else {
            console.log('User registered successfully');
            res.sendStatus(200);
          }
        });
      } catch (error) {
        console.error('Failed to parse data:', error);
        res.sendStatus(500);
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});