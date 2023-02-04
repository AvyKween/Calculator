import React from 'react'
import ReactDOM from 'react-dom/client'
import Calculator from './Calculator'
import './styles/styles.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>,
)
