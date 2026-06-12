import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css' // 글로벌 스타일(Tailwind) 불러오기

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)