import React, { useState } from 'react';
import './App.css'
import { handleClosePopup } from './handleClosePopup';
import { createQuery } from './main';

export const App: React.FC<{ env: string }> = ({ env }) => {
  const [formValue, setFormValues] = useState("");

    const submitFinal = () => {
      createQuery(formValue)
    }
  const handleChange = (e) => {
    const newFormValues = e.target.value;
    setFormValues(newFormValues);
  }
  return (
    <div>
    <div className="overlay" onClick={handleClosePopup}></div>
    <div className='flex justify-center h-screen w-screen'>
      <div className= "question-popup centered-element p-10" id='form'>
        <h1 className="font-bold text-4xl">Enter question!</h1>
        <br></br>
        <br></br>
        <input type="text" className='z-50 text-cyan-600 w-10/12 h-10 text-1xl rounded-xl' name="name" value={formValue} onChange={e => handleChange(e)} />
        {/* <h2 className="text-2xl mt-6">Current Env: {env}</h2> */}
        <br></br>
        <br></br>
        <button type="button"className='button submit' onClick={submitFinal}>Ask!</button>
        </div>
        
      </div>
    </div>
  )
}
//Can receive up to 2 inputs. If there are no results, it will return "No results"
export const App2: React.FC<{ results }> = ({ results}) => { //Second Screen, takes two inputs, a list of results(2) in the form of an array as [0][0] or [0][1] and [1] as the quesiton text
  return (
    <div className="w-screen h-screen flex items-center justify-center text-white">
      <div className="w-screen h-screen fixed top-0 left-0" onClick={() => logseq.hideMainUI()}></div>
      <div className="bg-gradient-to-tr from-cyan-400 via-teal-500 to-teal-600 flex flex-col items-center justify-center centered-element rounded-xl p-10">
        <h1 className="font-bold text-4xl">{results[1]}</h1> {/*Get user inputted question from input*/}
        <h2 className="text-2xl mt-6">Result: {results[0][0]}</h2> {/*Getting the first result*/}
        {/* <h2 className="text-2xl mt-6">Result 2: {env[0][1]}</h2> */} 
      </div>
    </div>
  )
}
// export default App2
