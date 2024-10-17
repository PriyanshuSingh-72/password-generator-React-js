import { useCallback, useState, useRef } from 'react'
function App(){
  const [length,setLength] = useState(8)
  const [numAllowed,setNumAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password,setPassword] = useState("")

  const generatePassword = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str += "1234567890"
    if(charAllowed) str +="~!@#$%^&*()_+{}|:><?"

    for(let i = 1;i<=length;i++){
      let charIdx = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(charIdx)
    }
    setPassword(pass)
  },[length,numAllowed,charAllowed,setPassword])

  const passwordRef = useRef(null)
  const copyToClipBoard = useCallback(()=>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current.select()
    
  },[password])
  return (
   <>
   <div className = " bg-gray-500  rounded w-full max-w-md mx-auto px-4 y-2 my-8 shadow-md">
    <h1 className="text-center">Password Generator</h1> 
    <div className="py-2 flex">
      <input 
      className = "w-full rounded-s-xl p-2 outline-none"
      placeholder="Password"
      readOnly
      value={password}
      type="text"
      ref={passwordRef}
       />
       <button
       onClick={copyToClipBoard}
        className="bg-blue-500 px-4 rounded-e-xl"
        >copy</button>
    </div>
    <div className="flex gap-2">
    <div>
    <input
      type="range" 
      min = {6}
      max={100}
      value={length}
      onChange={(e)=>{setLength(e.target.value)}}
     />
    <label htmlFor="">Length:{length}</label>
    </div>
    <div>
      <input
      defaultChecked = {numAllowed}
       type="checkbox" 
       id='Numallowed'
       onChange={()=>{setNumAllowed((prev)=>!prev)}}
       />
       <label htmlFor="Numallowed">Number</label>
    </div>
    <div>
      <input
       type="checkbox" 
       defaultChecked = {charAllowed}
       onChange={()=>{setCharAllowed((prev)=>!prev)}}
       />
       <label htmlFor="">Character</label>
    </div>
    </div>
    <div className = "flex p-2 justify-center">
      <button 
      onClick={generatePassword}
      className="bg-green-500 p-2 rounded"
      >
        Generate Password</button>
    </div>
   </div>
   </>
  )
}

export default App