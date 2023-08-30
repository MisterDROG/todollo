import { createTodo, deleteTodo, doneTodo, reOrderTodo, todoSlice } from "../../redux/reducers/todosReducer"

describe('Todos reducers test', () => {

    const todoMock1 = {
        "branch": "+house",
        "date": "01.02.22",
        "id": "1",
        "status": "unDone",
        "task": "Wash floor",
        "order": 1
    }

    const todoMock1Done = {
        "branch": "+house",
        "date": "01.02.22",
        "id": "1",
        "status": "Done",
        "task": "Wash floor",
        "order": 1
    }

    const todoMock2 = {
        "branch": "+house",
        "date": "15.05.22",
        "id": "2",
        "status": "unDone",
        "task": "Cook food",
        "order": 2
    }

    const todoMock1Reordered = {
        "branch": "+house",
        "date": "01.02.22",
        "id": "1",
        "status": "unDone",
        "task": "Wash floor",
        "order": 2
    }

    const todoMock2Reordered = {
        "branch": "+house",
        "date": "15.05.22",
        "id": "2",
        "status": "unDone",
        "task": "Cook food",
        "order": 1
    }

    const branchMock1 = {
        "branchCode": "+house",
        "branchName": "House"
    }

    test('Create todo reducer', () => {
        expect(todoSlice.reducer([], createTodo(todoMock1))).toEqual([todoMock1])
    })

    test('Delete todo reducer', () => {
        expect(todoSlice.reducer([todoMock1], deleteTodo(todoMock1))).toEqual([])
    })

    test('Done todo reducer', () => {
        expect(todoSlice.reducer([todoMock1], doneTodo("1"))).toEqual([todoMock1Done])
    })

    test('Reorder todo reducer', () => {
        expect(todoSlice.reducer([todoMock1, todoMock2], reOrderTodo({ replacedTodo: todoMock1, draggedTodo: todoMock2, enteredBranch: branchMock1, putCardToBottom: false }))).toEqual([todoMock1Reordered, todoMock2Reordered])
    })
})