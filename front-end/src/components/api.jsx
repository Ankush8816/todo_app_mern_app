const BASE_URL = import.meta.env.VITE_BASE_URL;

export const API = {
  login: `${BASE_URL}/login`,
  SignUp: `${BASE_URL}/signup`,
  UpdateTask: `${BASE_URL}/update-task`,
  tasks: `${BASE_URL}/tasks`,
  addtasks: `${BASE_URL}/add-task`,
  deleteTask: `${BASE_URL}/delete-task`,
  getUpdatedTaskData : `${BASE_URL}/get-updated-data`
};

//http://localhost:5000/add-task
//http://localhost:5000/login
//'http://localhost:5000/tasks'
//http://localhost:5000/delete-task
//
//http://localhost:5000/signup
//http://localhost:5000/update/