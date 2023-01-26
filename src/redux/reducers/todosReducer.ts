import { TodosArr, TODO_DONE, TODO_UNDONE } from "../../types"
import { initialTodos } from "../initialStates"
import { CHANGE_STATUS_TODO, CREATE_TODO, DELETE_TODO } from "../types"



export const todosReducer = (state: TodosArr = initialTodos, action: any) => {
  switch (action.type) {
    case CREATE_TODO:
      return [...state, action.payload]
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload)
    case CHANGE_STATUS_TODO:
      return state.map((todo) => {
        if (todo.id == action.payload) {
          switch (todo.status) {
            case TODO_DONE: return { ...todo, status: TODO_UNDONE }
            case TODO_UNDONE: return { ...todo, status: TODO_DONE }
          }
        }
        return todo
      })
    default: return state
  }
}