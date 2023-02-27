import { createReducer, createSlice, current, PayloadAction } from "@reduxjs/toolkit"
import { TodosArr, TodoType, TODO_DONE, TODO_UNDONE } from "../../types"
import { initialTodos } from "../initialStates"
import { getPostsThunk } from "../middlewares/thunks"
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
    getAllTodos(state, action: PayloadAction<TodosArr>) {
      return action.payload
    },
    createTodo(state, action: PayloadAction<TodoType>) {
      state.push(action.payload)
    },
    deleteTodo(state, action: PayloadAction<string>) {
      state.splice(state.findIndex((todo) => todo.id === action.payload), 1)
    },
    doneTodo(state, action: PayloadAction<string>) {
      const toggleTodo = state[state.findIndex((todo) => todo.id === action.payload)]
      switch (toggleTodo.status) {
        case TODO_UNDONE:
          toggleTodo.status = TODO_DONE
          break
        case TODO_DONE:
          toggleTodo.status = TODO_UNDONE;
          break
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostsThunk.pending, (state, action) => {

      })
      .addCase(getPostsThunk.fulfilled, (state, action) => {
        state = action.payload
      })
      .addCase(getPostsThunk.rejected, (state, action) => {

      })
  }
})

export const { getAllTodos, createTodo, deleteTodo, doneTodo } = todoSlice.actions