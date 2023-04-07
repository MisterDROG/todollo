import { createSlice, current, PayloadAction } from "@reduxjs/toolkit"
import { BranchType, TodosArr, TodoType, TODO_DONE, TODO_UNDONE } from "../../utils/generalTypes"
import { initialTodos } from "../initialStates"
import { getPostsThunk } from "../middlewares/thunks"

//slice for todos reducers


export const todoSlice = createSlice({
  name: 'todoSlice',
  initialState: initialTodos,
  reducers: {
    //create todo reducer
    createTodo(state, action: PayloadAction<TodoType>) {
      state.push(action.payload)
    },
    //delete todo reducer (inclides order change in the branch)
    deleteTodo(state, action: PayloadAction<TodoType>) {
      //order change in the branch
      const changedOrderState = current(state).map(todo => {
        if (todo.branch == action.payload.branch && todo.order > action.payload.order) {
          const newOrder = todo.order - 1
          return { ...todo, order: newOrder }
        }
        return todo
      })
      //deleting todo
      changedOrderState.splice(state.findIndex((todo) => todo.id === action.payload.id), 1)
      return changedOrderState
    },
    //change status of todo
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
    //reducer for changing order of todos cards from drag&drop
    //action payload variables match variables in app status state
    //(strongly need refactoring and encapsulation of logic according to SOLID, currently in develop)
    reOrderTodo(state, action: PayloadAction<{ replacedTodo: TodoType | null, draggedTodo: TodoType, enteredBranch: BranchType, putCardToBottom: true | false }>) {
      //setting variables for action.payload variables: current dragging card, current entering branch
      const draggedOrder = action.payload.draggedTodo.order
      const draggedBranch = action.payload.draggedTodo.branch
      const enteredBranch = action.payload.enteredBranch.branchCode

      //first step: Decrease the order of all cards following the dragged card. "Pull out" the dragged card.
      const dragoutedState = current(state).map(todo => {
        if (todo.branch == draggedBranch && todo.order > draggedOrder) {
          const newOrder = todo.order - 1
          return { ...todo, order: newOrder }
        }
        return todo
      })

      //second step: put dragged card to the new place. Three global cases of dragged card location are considered:
      //first case: card is dragged to none of the cards, only to the free space of the branch. Dragged card becomes last card in the branch.
      //creating array of all todos currently are in branch where user is dropping the todo card
      const currentBranchTodos = current(state).filter(todo => todo.branch == enteredBranch)
      if (action.payload.replacedTodo == null) {
        return dragoutedState.map(todo => {
          //entering branch has cards
          if (todo.id == action.payload.draggedTodo.id && currentBranchTodos.length == 0) {
            return { ...todo, branch: enteredBranch, order: 1 }
            //entering branch is empty
          } else if (todo.id == action.payload.draggedTodo.id && currentBranchTodos.length !== 0) {
            return { ...todo, branch: enteredBranch, order: currentBranchTodos.length + 1 }
          }
          return todo
        })
      }

      //second case: dragged card is placed on itself
      if (action.payload.draggedTodo.id == action.payload.replacedTodo.id) {
        return [...state]
      }

      //third case: dragged card is placed on another card which we call replaced card
      //(it's called replaced figuratively: card is not replaced, it just serves as a location marker for the dragged card)
      //setting variables for action.payload variables: current replacing card
      let repalcedOrder = action.payload.replacedTodo.order
      //checking if the dragged card is placed on the top of the replaced card or on the bottom. Depending on this, we respectively insert dragged card below or above replaced card.
      action.payload.putCardToBottom ? repalcedOrder -= 0 : repalcedOrder -= 1
      const repalcedBranch = action.payload.replacedTodo.branch

      //assigning new locations to all cards and sending to the state. Six cases are considered:
      return dragoutedState.map(todo => {
        //case 1: the card is not dragged and not replaced but stands below the replaced card in the branch where the dragged card is moved
        if (todo.branch == repalcedBranch && todo.order > repalcedOrder && todo.id !== action.payload.draggedTodo.id) {
          const newOrder = todo.order + 1
          return { ...todo, order: newOrder }
        }
        //case 2: the card is replaced and the dragged card is transferred to the same branch where it was before from top to bottom
        else if (todo.branch == repalcedBranch && repalcedBranch == draggedBranch && draggedOrder < repalcedOrder && todo.order == repalcedOrder) {
          const newOrder = todo.order + 1
          return { ...todo, order: newOrder }
        }
        //case 3: the card is dragged and the dragged card is transferred to the different branch where it was before
        else if (todo.id == action.payload.draggedTodo.id && repalcedBranch !== draggedBranch) {
          const newOrder = repalcedOrder + 1
          return { ...todo, order: newOrder, branch: enteredBranch }
        }
        //case 4: the card is dragged and the dragged card is transferred to the same branch where it was before from bottom to top
        else if (todo.id == action.payload.draggedTodo.id && repalcedBranch == draggedBranch && draggedOrder > repalcedOrder) {
          const newOrder = repalcedOrder + 1
          return { ...todo, order: newOrder, branch: enteredBranch }
        }
        //case 5: the card is dragged and the dragged card is transferred to the same branch where it was before from top to bottom
        else if (todo.id == action.payload.draggedTodo.id && repalcedBranch == draggedBranch && draggedOrder < repalcedOrder) {
          const newOrder = repalcedOrder
          return { ...todo, order: newOrder, branch: enteredBranch }
        }
        //case 6: card does not participate in movements
        return todo
      })
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch todos from database using get posts thunk with loading states
      .addCase(getPostsThunk.fulfilled, (state, action: PayloadAction<TodosArr>) => {
        return [...action.payload]
      })
  }
})

export const { createTodo, deleteTodo, doneTodo, reOrderTodo } = todoSlice.actions
