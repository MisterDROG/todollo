import { BranchArr, TodosArr } from "./generalTypes"

//API for get/send data to firebase database

async function getData(url: string) {
    const response = await fetch(url, {
        method: 'GET'
    })
    const responseJSON = await response.json()
    return responseJSON
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