import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import Search from './Search'
import './index.css'
import { Route, Routes } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="search" element={<Search />} />
        </Routes>
    </BrowserRouter>, 
    document.getElementById('root')
);
