import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom'
import store from "../store.ts";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <Router>
                <App></App>
            </Router>
        </Provider>
    </StrictMode>,
)
