import { createAction } from "@reduxjs/toolkit";
import { TodoType } from "../../utils/generalTypes";
import { CHANGE_STATUS_TODO, CREATE_TODO, DELETE_TODO } from "../types";

// export function createTodo(todo: TodoType) {
//     return {
//         type: CREATE_TODO,
//         payload: todo
//     }
// }

// export function deleteTodo(id: string) {
//     return {
//         type: DELETE_TODO,
//         payload: id
//     }
// }

// export function doneTodo(todo: string) {
//     return {
//         type: CHANGE_STATUS_TODO,
//         payload: id
//     }
// }

export const createTodo = createAction<TodoType>(CREATE_TODO)
export const deleteTodo = createAction<string>(DELETE_TODO)
export const doneTodo = createAction<string>(CHANGE_STATUS_TODO)