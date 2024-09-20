import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {App} from './App.jsx'
import './index.css'
import { AuthProvider } from '../context/AuthContext'
import { BrowserRouter as Router } from 'react-router-dom';

const root =createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <Router>

    <AuthProvider>
    <App />
    
    </AuthProvider>
    </Router>
  </StrictMode>
)
