import { createReducer, createSlice, current } from "@reduxjs/toolkit"
import { TodosArr, TODO_DONE, TODO_UNDONE } from "../../types"
import { createTodo, deleteTodo, doneTodo } from "../actions/actionsToDo"
import { initialTodos } from "../initialStates"
import { CHANGE_STATUS_TODO, CREATE_TODO, DELETE_TODO } from "../types"

// export const todosReducer = (state: TodosArr = initialTodos, action: any) => {
//   console.log(action.type, action.payload)
//   switch (action.type) {
//     case CREATE_TODO:
//       return [...state, action.payload]
//     case DELETE_TODO:
//       return state.filter((todo) => todo.id !== action.payload)
//     case CHANGE_STATUS_TODO:
//       return state.map((todo) => {
//         if (todo.id == action.payload) {
//           switch (todo.status) {
//             case TODO_DONE: return { ...todo, status: TODO_UNDONE }
//             case TODO_UNDONE: return { ...todo, status: TODO_DONE }
//           }
//         }
//         return todo
//       })
//     default: return state
//   }
// }

// export const todosReducer = createReducer(initialTodos, (builder) => {
//   builder
//     .addCase(createTodo, (state, action) => [...state, action.payload])
//     .addCase(deleteTodo, (state, action) => state.filter((todo) => todo.id !== action.payload))
//     .addCase(doneTodo, (state, action) => {
//       return state.map((todo) => {
//         if (todo.id == action.payload) {
//           switch (todo.status) {
//             case TODO_DONE: return { ...todo, status: TODO_UNDONE }
//             case TODO_UNDONE: return { ...todo, status: TODO_DONE }
//           }
//         }
//         return todo
//       })
//     })
//     .addDefaultCase((state, action) => state)
// })

export const todoSlice = createSlice({
  name: 'todoSlice',
  initialState: initialTodos,
  reducers: {
    createTodo(state, action) {
      state.push(action.payload)
    },
    deleteTodo(state, action) {
      state.splice(state.indexOf((state.filter((todo) => todo.id === action.payload))[0]), 1)
    },
    doneTodo(state, action) {
      switch (state[state.indexOf((state.filter((todo) => todo.id === action.payload))[0])].status) {
        case TODO_UNDONE:
          state[state.indexOf((state.filter((todo) => todo.id === action.payload))[0])].status = TODO_DONE
          break
        case TODO_DONE:
          state[state.indexOf((state.filter((todo) => todo.id === action.payload))[0])].status = TODO_UNDONE;
          break
      }
      return state
    }
  }
})