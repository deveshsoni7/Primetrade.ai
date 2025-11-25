const Task = require('../models/Task');
const { validationResult } = require('express-validator');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
    try {
        let tasks;
        if (req.user.role === 'admin') {
            tasks = await Task.find().populate('assignedTo', 'name email').populate('createdBy', 'name email');
        } else {
            tasks = await Task.find({
                $or: [{ assignedTo: req.user._id }, { createdBy: req.user._id }],
            }).populate('assignedTo', 'name email').populate('createdBy', 'name email');
        }
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, status, assignedTo } = req.body;

    try {
        const task = await Task.create({
            title,
            description,
            status,
            assignedTo: assignedTo || req.user._id, // Default to self if not provided
            createdBy: req.user._id,
        });

        const populatedTask = await Task.findById(task._id).populate('assignedTo', 'name email').populate('createdBy', 'name email');

        res.status(201).json(populatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
    const { title, description, status, assignedTo } = req.body;

    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check permissions: Admin can update any, User can update own or assigned
        if (
            req.user.role !== 'admin' &&
            task.createdBy.toString() !== req.user._id.toString() &&
            task.assignedTo.toString() !== req.user._id.toString()
        ) {
            return res.status(403).json({ message: 'Not authorized to update this task' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        if (assignedTo && req.user.role === 'admin') {
            // Only admin can reassign? Or maybe creator too. Let's allow creator too.
            task.assignedTo = assignedTo;
        } else if (assignedTo && task.createdBy.toString() === req.user._id.toString()) {
            task.assignedTo = assignedTo;
        }

        const updatedTask = await task.save();
        const populatedTask = await Task.findById(updatedTask._id).populate('assignedTo', 'name email').populate('createdBy', 'name email');
        res.json(populatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check permissions: Admin can delete any, User can delete own created
        if (req.user.role !== 'admin' && task.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this task' });
        }

        await task.deleteOne();
        res.json({ message: 'Task removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
