// Mock data for todos
const mockTodos = [
  {
    id: 1,
    title: 'Learn React',
    completed: false,
  },
  {
    id: 2,
    title: 'Build CRUD app',
    completed: true,
  },
];

// Get all todos
export const getTodos = async (req, res, next) => {
  try {
    res.json(mockTodos);
  } catch (error) {
    next(error);
  }
};

// Get todo by ID
export const getTodoById = async (req, res, next) => {
  try {
    const todo = mockTodos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
      const error = new Error('Todo not found');
      error.status = 404;
      return next(error);
    }
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

// Create todo
export const createTodo = async (req, res, next) => {
  try {
    if (!req.body.title) {
      const error = new Error('Title is required');
      error.status = 400;
      return next(error);
    }
    const newTodo = { id: mockTodos.length + 1, ...req.body };
    mockTodos.push(newTodo);
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

// Update todo
export const updateTodo = async (req, res, next) => {
  try {
    const index = mockTodos.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
      const error = new Error('Todo not found');
      error.status = 404;
      return next(error);
    }
    mockTodos[index] = { ...mockTodos[index], ...req.body };
    res.json(mockTodos[index]);
  } catch (error) {
    next(error);
  }
};

// Delete todo
export const deleteTodo = async (req, res, next) => {
  try {
    const index = mockTodos.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
      const error = new Error('Todo not found');
      error.status = 404;
      return next(error);
    }
    mockTodos.splice(index, 1);
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    next(error);
  }
};