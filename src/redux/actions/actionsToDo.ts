import { TodoType } from "../../types";
import { CHANGE_STATUS_TODO, CREATE_TODO, DELETE_TODO } from "../types";

export function createTodo(todo: TodoType) {
    return {
        type: CREATE_TODO,
        payload: todo
    }
}

export function deleteTodo(id: string) {
    return {
        type: DELETE_TODO,
        payload: id
    }
}

export function doneTodo(todo: TodoType) {
    return {
        type: CHANGE_STATUS_TODO,
        payload: todo
    }
}