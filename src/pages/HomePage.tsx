import React from 'react';
import BaseCurrencyComponent from "../components/BaseCurrencyComponent";
import { ExchangeRatesComponent } from "../components";
import {Container} from "@mui/material";

const HomePage = () => {
    return (
        <Container>
            <BaseCurrencyComponent />
            <ExchangeRatesComponent />
        </Container>
    );
};

export default HomePage;