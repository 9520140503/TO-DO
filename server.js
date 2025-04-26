const express = require("express");
const app = express();
const fs = require('fs');
const cors = require('cors');

app.use(express.json());
app.use(cors());

let todos = [];

// Route to get all tasks
app.get('/get-todos',(req,res)=>{
    fs.readFile('todo.json','utf8',(err,data)=>{
        if(err){
            return res.status(500).json({message: "Error reading todo"});
        }
        try{
            todos = JSON.parse(data);
        } catch (parseError) {
            return res.status(500).json({ message: "Error parsing todo.json" });
          }
          res.status(200).json(todos);
    })
})
// Route to add a new task
app.post('/add-todo', (req, res) => {
  const newTodo = req.body;
  fs.readFile('todo.json', 'utf8', (err, data) => {
    if (!err && data) {
      try {
        todos = JSON.parse(data);
      } catch (parseError) {
        return res.status(500).json({ message: "Error parsing todo.json" });
      }
    }
    todos.push(newTodo);
    fs.writeFile('todo.json', JSON.stringify(todos, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to save todo" });
      }
      res.status(200).json({ message: "Todo saved successfully" });
    });
  });
});

// Route to delete a task
app.delete('/delete-todos', (req, res) => {
  const { task } = req.body;
  todos = todos.filter(t => t.task !== task);
  fs.writeFile('todo.json', JSON.stringify(todos, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to delete todo" });
    }
    res.json({ message: "Task deleted" });
  });
});



app.listen(4000, () => {
  console.log("Server running successfully at 4000");
});
