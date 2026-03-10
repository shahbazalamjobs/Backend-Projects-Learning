import { writeTasks, readTasks } from "../services/taskService.js";
import AppError from "../utils/AppError.js";

export const createTask = async (req, res, next) => {
    try {
        const { title } = req.body;

        if (!title) {
            throw new AppError("Title is required", 400);
        }

        const tasks = await readTasks();

        const newTask = {
            id: Date.now(),
            title,
            completed: false
        }

        tasks.push(newTask);

        await writeTasks(tasks)

        res.status(201).json(newTask);

    } catch (error) {
        next(error);
    }
}

export const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await readTasks();
        res.json(tasks);
    } catch (error) {
        next(error);
    }
}

export const getTaskById = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const tasks = await readTasks();

        const task = tasks.find(t => t.id === id);

        if (!task) {
            throw new AppError("Task not found", 404);
        }

        res.json({
            task
        })
    } catch (error) {
        next(error)
    }
}

export const updateTask = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const { title, completed } = req.body;

        const tasks = await readTasks();

        const task = tasks.find(t => t.id === id);

        if (!task) {
            throw new AppError("Task not found", 404);
        }

        // one way
        // if (title !== undefined) task.title = title;
        // if (completed !== undefined) task.completed = completed;

        // advance way : if value exists → use it, else → keep old value
        task.title = title ?? task.title;
        task.completed = completed ?? task.completed;

        await writeTasks(tasks)

        res.json(task)
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const tasks = await readTasks();

    const filteredTasks = tasks.filter((t) => t.id !== id);

    if (tasks.length === filteredTasks.length) {
      throw new AppError("Task not found", 404);
    }

    await writeTasks(filteredTasks);

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};