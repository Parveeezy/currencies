import React from 'react';
import './App.css';
import HomePage from "./pages/HomePage";
import {BaseCurrencyProvider} from "./providers/CurrenciesProvider";
import ExchangePage from "./pages/ExchangePage";

const App = () => {

    return (
        <BaseCurrencyProvider >
            <ExchangePage/>
            <HomePage/>
        </BaseCurrencyProvider>
    );
}

export default App;
