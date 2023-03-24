import { createSlice, current, PayloadAction } from "@reduxjs/toolkit"
import { TodosArr, TodoType, TODO_DONE, TODO_UNDONE } from "../../types"
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
    reOrderTodo(state, action: PayloadAction<{ todoReplaced: TodoType, todoDragged: TodoType }>) {
      const repalcedOrder = action.payload.todoReplaced.order
      const draggedOrder = action.payload.todoDragged.order
      const repalcedBranch = action.payload.todoReplaced.branch
      if (draggedOrder == repalcedOrder) {
        return [...state]
      }
      console.log('!!todoDragged', draggedOrder, '!!todoReplaced', repalcedOrder)
      const moc: TodosArr = current(state)
      const reorderedTodos = moc.map(todo => {
        if (draggedOrder > repalcedOrder) {
          if (todo.order >= repalcedOrder && todo.order <= draggedOrder) {
            if (todo.order == draggedOrder) {
              return { ...todo, order: repalcedOrder, branch: repalcedBranch }
            }
            const newOrder = todo.order + 1
            return { ...todo, order: newOrder }
          }
          return todo
        } else {
          if (todo.order <= repalcedOrder && todo.order >= draggedOrder) {
            if (todo.order == draggedOrder) {
              return { ...todo, order: repalcedOrder, branch: repalcedBranch }
            }
            const newOrder = todo.order - 1
            return { ...todo, order: newOrder }
          }
          return todo
        }
      }
      )
      console.log('reorderedTodos', reorderedTodos)
      return reorderedTodos
    }
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

