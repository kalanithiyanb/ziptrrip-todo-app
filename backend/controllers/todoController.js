const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/todos.json");

function readTodos() {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

function writeTodos(todos) {
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
}

// Get all todos
exports.getTodos = (req, res) => {
    const todos = readTodos();
    res.json(todos);
};

// Get todo by ID
exports.getTodoById = (req, res) => {
    const todos = readTodos();
    const todo = todos.find(t => t.id == req.params.id);

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
};

// Add todo
exports.addTodo = (req, res) => {
    const todos = readTodos();

    const newTodo = {
        id: Date.now(),
        title: req.body.title,
        completed: false
    };

    todos.push(newTodo);
    writeTodos(todos);

    res.status(201).json(newTodo);
};

// Update todo
exports.updateTodo = (req, res) => {
    const todos = readTodos();

    const index = todos.findIndex(t => t.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Todo not found" });
    }

    todos[index] = {
        ...todos[index],
        ...req.body
    };

    writeTodos(todos);

    res.json(todos[index]);
};

// Delete todo
exports.deleteTodo = (req, res) => {
    const todos = readTodos();

    const filteredTodos = todos.filter(t => t.id != req.params.id);

    writeTodos(filteredTodos);

    res.json({ message: "Todo deleted successfully" });
};