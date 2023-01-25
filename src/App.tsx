import { useState } from 'react';
// import './App.css';
import BranchHolder from './components/branchHolder/branchHolder';
import { BranchArr, BranchType, TodosArr, TodoType } from './types';


function App() {


  return (
    <div className="App">
      <BranchHolder />
    </div>
  );
}

export default App;
function configureStore() {
  throw new Error('Function not implemented.');
}

