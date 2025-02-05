// import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import './components/SignupForm'
import { useState } from 'react'
import { SignUpForm } from './components/SignupForm'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div>
            <div>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>

            <SignUpForm />
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </div >
    )
}

export default App
