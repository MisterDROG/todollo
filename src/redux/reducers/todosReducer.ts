import { createSlice, current, PayloadAction } from "@reduxjs/toolkit"
import { BranchType, TodosArr, TodoType, TODO_DONE, TODO_UNDONE } from "../../types"
import { initialTodos } from "../initialStates"
import { getPostsThunk } from "../middlewares/thunks"

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
    },
    reOrderTodo(state, action: PayloadAction<{ replacedTodo: TodoType | null, draggedTodo: TodoType, enteredBranch: BranchType }>) {
      const currentBranchTodos = current(state).filter(todo => todo.branch == action.payload.enteredBranch.branchCode)
      const dragoutedState = current(state).map(todo => {
        if (todo.branch == action.payload.draggedTodo.branch && todo.order > action.payload.draggedTodo.order) {
          const newOrder = todo.order - 1
          return { ...todo, order: newOrder }
        }
        return todo
      })
      console.log('null')
      if (action.payload.replacedTodo == null) {
        return dragoutedState.map(todo => {
          if (todo.id == action.payload.draggedTodo.id && currentBranchTodos.length == 0) {
            return { ...todo, branch: action.payload.enteredBranch.branchCode, order: 1 }
          } else if (todo.id == action.payload.draggedTodo.id && currentBranchTodos.length !== 0) {
            return { ...todo, branch: action.payload.enteredBranch.branchCode, order: currentBranchTodos.length + 1 }
          }
          return todo
        })
      }
      const repalcedOrder = action.payload.replacedTodo.order
      const draggedOrder = action.payload.draggedTodo.order
      const enteredBranch = action.payload.enteredBranch.branchCode
      console.log('equal')
      if (action.payload.draggedTodo.id == action.payload.replacedTodo.id) {
        return [...state]
      }
      console.log('done')
      const returnedState = dragoutedState.map(todo => {
        if (todo.branch == enteredBranch && todo.order > repalcedOrder) {
          const newOrder = todo.order + 1
          return { ...todo, order: newOrder }
        } else if (todo.id == action.payload.draggedTodo.id) {
          const newOrder = repalcedOrder + 1
          return { ...todo, order: newOrder, branch: enteredBranch }
        }
        return todo
      })
      console.log("current(state): ", current(state))
      console.log("dragoutedState: ", dragoutedState)
      console.log("returnedState: ", returnedState)
      return returnedState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostsThunk.fulfilled, (state, action: PayloadAction<TodosArr>) => {
        return [...action.payload]
      })
  }
})

export const { getAllTodos, createTodo, deleteTodo, doneTodo, reOrderTodo } = todoSlice.actions

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

