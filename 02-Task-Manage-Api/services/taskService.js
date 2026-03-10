
import fs from 'fs/promises'
import path from 'path';
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "..", "data", "tasks.json");

export const readTasks = async () => {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

export const writeTasks = async (tasks) => {
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
}