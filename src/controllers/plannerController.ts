import type { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { readDb, writeDb } from "../utils/fileDb.js";
import { success, created, noContent, notFound, serverError } from "../utils/response.js";

interface Task {
  id: string;
  title: string;
  time: string;
  day: string;
  completed: boolean;
  createdAt: string;
}

export function getTasks(req: Request, res: Response) {
  try {
    const tasks = readDb<Task[]>("planner.json", []);
    const { day } = req.query as { day?: string };
    const filtered = day ? tasks.filter((t) => t.day.toLowerCase() === day.toLowerCase()) : tasks;
    success(res, filtered, "Tasks fetched");
  } catch (err) {
    serverError(res);
  }
}

export function createTask(req: Request, res: Response) {
  try {
    const { title, time, day } = req.body;
    const tasks = readDb<Task[]>("planner.json", []);

    const task: Task = {
      id: uuidv4(),
      title,
      time,
      day,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    tasks.push(task);
    writeDb("planner.json", tasks);
    created(res, task, "Task created");
  } catch (err) {
    serverError(res);
  }
}

export function updateTask(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const tasks = readDb<Task[]>("planner.json", []);
    const taskIndex = tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      notFound(res, "Task not found");
      return;
    }

    tasks[taskIndex] = { ...tasks[taskIndex]!, ...req.body, id };
    writeDb("planner.json", tasks);
    success(res, tasks[taskIndex], "Task updated");
  } catch (err) {
    serverError(res);
  }
}

export function deleteTask(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const tasks = readDb<Task[]>("planner.json", []);
    const filtered = tasks.filter((t) => t.id !== id);

    if (filtered.length === tasks.length) {
      notFound(res, "Task not found");
      return;
    }

    writeDb("planner.json", filtered);
    noContent(res);
  } catch (err) {
    serverError(res);
  }
}
