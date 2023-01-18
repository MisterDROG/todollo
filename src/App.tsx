import React, { useState } from 'react';
import logo from './logo.svg';
// import './App.css';
import BranchHolder from './components/branchHolder/branchHolder';
import { BranchArr, BranchType, TodosArr, TodoType } from './types';

const initialTodos: TodosArr = [
  { task: 'clean floor', date: '01.02.22', branch: 'house', id: '1' },
  { task: 'cook food', date: '15.05.22', branch: 'house', id: '2' },
  { task: 'wash dishes', date: '23.09.22', branch: 'house', id: '3' },
  { task: 'write program', date: '11.03.22', branch: 'work', id: '4' },
  { task: 'work with exel', date: '16.04.22', branch: 'work', id: '5' },
  { task: 'send email', date: '07.05.22', branch: 'work', id: '6' },
  { task: 'do squads', date: '06.04.22', branch: 'sport', id: '7' },
  { task: 'buy a ball', date: '22.11.22', branch: 'sport', id: '8' },
  { task: 'upgrade bike', date: '17.12.22', branch: 'sport', id: '9' },
]

const initialBranches: BranchArr = [
  { branchName: 'house', branchCode: 'house' },
  { branchName: 'work', branchCode: 'work' },
  { branchName: 'sport', branchCode: 'sport' },
]

function App() {

  const [todos, setTodos] = useState(initialTodos)
  const [branches, setBranches] = useState(initialBranches)

  function addToDo(input: TodoType) {
    setTodos([...todos, input])
  }

  function addBranch(input: BranchType) {
    setBranches([...branches, input])
  }

  return (
    <div className="App">
      <p>LengthTodos{todos.length}</p>
      <BranchHolder todos={todos} branches={branches} addToDo={addToDo} addBranch={addBranch} />
    </div>
  );
}

export default App;
