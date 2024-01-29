import { httpAxios } from '@/db/httpHelper.js'

export async function addTask(task) {
    try {
        const result = await httpAxios.post("/api/tasks", task);
        return result;
    } catch (error) {
        // throw new Error("Task Creation error");
        console.log(error);
        return null;
    }
}


export async function getTaskOfUser(userId) {
    try {
        const result = await httpAxios.get(`/api/users/${userId}/tasks`)
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function deleteTaskAPI(taskId) {
    try {
        const result = await httpAxios.delete(`/api/tasks/${taskId}`)
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}