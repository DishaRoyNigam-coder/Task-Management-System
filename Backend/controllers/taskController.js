const Task = require('../models/Task');
const { validationResult } = require('express-validator');

// @desc   Create task
// @route  POST /api/tasks
exports.createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { title, description, status } = req.body;
    const task = await Task.create({
      title,
      description,
      status,
      createdBy: req.user._id, // 🔐 linked to logged-in user
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// @desc   Get all tasks of logged-in user
// @route  GET /api/tasks
exports.getTasks = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;

    const query = { createdBy: req.user._id };
    if (status) query.status = status;
    if (search) query.title = { $regex: search, $options: 'i' };

    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Task.countDocuments(query);

    res.json({ tasks, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

// @desc   Get single task (ownership check)
// @route  GET /api/tasks/:id
exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user._id, // 🔐 ownership
    });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// @desc   Update task
// @route  PUT /api/tasks/:id
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id }, // 🔐 ownership
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// @desc   Delete task
// @route  DELETE /api/tasks/:id
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted', id: req.params.id });
  } catch (err) {
    next(err);
  }
};