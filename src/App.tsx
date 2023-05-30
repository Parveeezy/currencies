import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import { BaseCurrencyProvider } from './providers/CurrenciesProvider';
import ExchangePage from './pages/ExchangePage';
import { Route, Routes } from 'react-router-dom';

const App = () => {

    return (
        <>
            <BaseCurrencyProvider>
                <Routes>
                    <Route path={'/'} element={<HomePage />} />
                    <Route path={'/exchange'} element={<ExchangePage />} />
                </Routes>
            </BaseCurrencyProvider>
        </>
    );
};

export default App;
