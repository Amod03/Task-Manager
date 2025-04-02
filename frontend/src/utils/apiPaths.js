export const BASE_URL="http://localhost:8000";

//utils/apiPaths.js
export const API_PATHS={
    AUTH:{
        LOGIN:"/api/auth/login", //Authenticate and return jwt token
        REGISTER:"/api/auth/register", //register a new user
        GET_PROFILE:"/api/auth/profile", //get loggedin user details
    },
    
    USERS:{
        GET_ALL_USERS:"/api/users", //get all users (admin only)
        GET_USER_BY_ID:(userId)=>`/api/users/${userId}`, //get user by id
        CREATE_USER:"/api/users", //create a new user(admin only)
        UPDATE_USER:(userId)=>`/api/users/${userId}`, //update user details
        DELETE_USER:(userId)=>`/api/users/${userId}`,//delete a user
    },

    TASKS:{
        GET_DASHBOARD_DATA:"/api/tasks/dashboard-data", //Get dashboard data
        GET_USER_DASHBOARD_DATA:"/api/tasks/user-dashboard-data", //get user dashboard data
        GET_ALL_TASKS:"/api/tasks", //get all tasks(admin:all,user:only assigned)
        GET_TASK_BY_ID:(taskId)=>`/api/tasks/${taskId}`, //get taskby id
        CREATE_TASK:"/api/tasks", //create a new task (admin only)
        UPDATE_TASK:(taskId)=>`/api/tasks/${taskId}`, //update task details
        DELETE_TASK:(taskId)=>`/api/tasks/${taskId}`, //delete a task(admin only)
        UPDATE_TASK_STATUS:(taskId)=>`/api/tasks/${taskId}/status`, //update task status
        UPDATE_TODO_STATUS:(taskId)=>`/api/tasks/${taskId}/todo`, //update todo
    },

    REPORTS:{
        EXPORT_TASKS:"/api/reports/export/tasks", //Download all tasks as an excel
        EXPORT_USERS:"/api/reports/export/users", //Download user-task report
    },

    IMAGE:{
        UPLOAD_IMAGE:"/api/auth/upload-image",
    }
}
