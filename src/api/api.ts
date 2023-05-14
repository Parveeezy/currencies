import axios from "axios";

import {formatCurrencies} from "./resultFormatter";

export const getCurrencies = async () => axios
    .get('https://api.currencybeacon.com/v1/currencies?api_key=8be7ac458e58f1f756478172eb56e18f')
    .then(result => formatCurrencies(result.data.response.fiats))
    .catch(error => error);

export const getCurrencyRates = async (currency: string) => axios
    .get(`https://api.currencybeacon.com/v1/latest?api_key=8be7ac458e58f1f756478172eb56e18f&base=${currency}`)
    .then(result => result.data.response.rates)
    .catch(error => error);
