import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowded] = useState(false)
  const [password, setPassword] = useState('')

  const passRef = useRef(null)

  const generatePass = useCallback(() => {
    let pass = ""
    let str =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+"

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed])

  useEffect(() => {
    generatePass()
  }, [length, charAllowed, numberAllowed, generatePass])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passRef.current?.select()
  }

  return (
    <div className="flex justify-center mt-8">
      <div className='w-full max-w-md max-auto shadow-md 
    rounded-lg px-4 py-3 my-8 bg-gray-600 text-orange-600'>
        <h1 className='text-white font-bold my-3 
      text-center'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden
      mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-600 text-white px-3 
        py-0.5 shrink-0'
          >copy</button>
        </div>
        <div
          className='flex text-sm gap-x-2'
        >
          <div className='fle--items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
              name=''
              id=''
            />
            <label className='font-bold' htmlFor="length"> Length : {length}</label>
          </div>
          <div className='fle--items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
              name=""
              id="" />
            <label className='font-bold' htmlFor="number"> Numbers</label>
          </div>
          <div className='fle--items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowded((prev) => !prev)
              }}
              name=""
              id="" />
            <label className='font-bold' htmlFor="charInput"> Character</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
