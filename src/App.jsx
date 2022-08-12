import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from './components/Header';
import HomePage from './WebPages/HomePage';
import CoinPage from './WebPages/CoinPage';

function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <Header />
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route path="/coins/:id" element={<CoinPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;
