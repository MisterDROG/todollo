import { TodoType } from "../../types";
import { CREATE_TODO, DELETE_TODO, DONE_TODO } from "../types";

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
        type: DONE_TODO,
        payload: todo
    }
}