import { appStatusSlice, setDraggedTodo, setEnteredBranch, setIsDragging, setPutCardToBottom, setReplacedTodo, setReplacedTodoNull } from "../../redux/reducers/appStatusReducer"

describe('AppStatus reducers test', () => {

    const todoMock1 = {
        "branch": "+house",
        "date": "01.02.22",
        "id": "1",
        "status": "unDone",
        "task": "Wash floor",
        "order": 1
    }

    const branchMock1 = {
        "branchCode": "+house",
        "branchName": "House"
    }

    const statusMock = {
        status: null,
        error: null,
        draggedTodo: null,
        replacedTodo: null,
        enteredBranch: null,
        isDragging: false,
        putCardToBottom: false
    }

    test('Set DraggedTodo reducer', () => {
        expect(appStatusSlice.reducer(statusMock, setDraggedTodo(todoMock1))).toEqual({ ...statusMock, draggedTodo: todoMock1 })
    })

    test('Set ReplacedTodo reducer', () => {
        expect(appStatusSlice.reducer(statusMock, setReplacedTodo(todoMock1))).toEqual({ ...statusMock, replacedTodo: todoMock1 })
    })

    test('Set ReplacedTodoNull reducer', () => {
        expect(appStatusSlice.reducer({ ...statusMock, replacedTodo: todoMock1 }, setReplacedTodoNull(null))).toEqual(statusMock)
    })

    test('Set IsDragging reducer', () => {
        expect(appStatusSlice.reducer(statusMock, setIsDragging(true))).toEqual({ ...statusMock, isDragging: true })
    })

    test('SetPutCardToBottom reducer', () => {
        expect(appStatusSlice.reducer(statusMock, setPutCardToBottom(true))).toEqual({ ...statusMock, putCardToBottom: true })
    })

    test('Set EnteredBranch reducer', () => {
        expect(appStatusSlice.reducer(statusMock, setEnteredBranch(branchMock1))).toEqual({ ...statusMock, enteredBranch: branchMock1 })
    })

})