import { BranchArr, TodosArr } from "../types"

async function getData(url: string) {
    const response = await fetch(url, {
        method: 'GET'
    })
    if (!response.ok) {
        return 'error'
    }
    const responseJSON = await response.json()
    let result = Object.keys(responseJSON).map(key => {
        return { ...responseJSON[key], id: key }
    })
    return result
}

async function sendData(url: string, payload: TodosArr | BranchArr) {
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(payload)
    })
    return response.json()
}

export default {
    getData,
    sendData
}