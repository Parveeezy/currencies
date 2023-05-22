import React, { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react';
import {
    ExchangePairsBlock,
    ExchangePairsContainer,
    ExchangePairsFromTo,
    ExchangePairsInput,
    ExchangePairsInputsBlock,
    ExchangePairsSelect,
    ExchangePairsSwiperButton,
    ExchangePairsTitle,
} from './components';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { MenuItem } from '@mui/material';
import { useBaseCurrency } from '../../providers/CurrenciesProvider';
import { Currencies, getCurrencyRates } from '../../api';


const ExchangePairsComponent = () => {

    let date = new Date();

    const { currenciesList, baseCurrency } = useBaseCurrency();

    const [rates, setRates] = useState({});

    const mappedCurrenciesList = currenciesList.map(el => el.code)


    const [currencyOptionsFirst, setCurrencyOptionsFirst] = useState<string>('USD');
    const [currencyOptionsSecond, setCurrencyOptionsSecond] = useState<string>('RUB');
    const [fromCurrency, setFromCurrency] = useState();
    const [toCurrency, setToCurrency] = useState();

    const getCurrencyRatesFromApi = async () => {
        const result = await getCurrencyRates(baseCurrency);
        setRates(result);
    };


    useEffect(() => {
        getCurrencyRatesFromApi();
        setFromCurrency(rates[currencyOptionsFirst])
        setToCurrency(rates[currencyOptionsSecond])
    }, [baseCurrency, rates]);

    const changeFirstCurrencyOptions = (event: any) => {
        setCurrencyOptionsFirst(event.target.innerText);
    };

    const changeSecondCurrencyOptions = (event: any) => {
        setCurrencyOptionsSecond(event.target.innerText);
    };


    return (
        <ExchangePairsContainer>
            <ExchangePairsBlock>
                <ExchangePairsTitle>
                    CONVERTER AT THE RATE as of {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}
                </ExchangePairsTitle>

                <ExchangePairsInputsBlock>
                    <ExchangePairsFromTo>
                        <ExchangePairsInput value={Math.floor(fromCurrency * 100) / 100} />

                        <ExchangePairsSelect value={currencyOptionsFirst} onClick={changeFirstCurrencyOptions}>
                            {currenciesList.map(el => {
                                return (
                                    <MenuItem
                                        key={el.code}
                                        value={el.code}
                                    >
                                        {el.code}
                                    </MenuItem>
                                );
                            })}
                        </ExchangePairsSelect>
                    </ExchangePairsFromTo>

                    <ExchangePairsSwiperButton>
                        <SyncAltIcon />
                    </ExchangePairsSwiperButton>

                    <ExchangePairsFromTo>
                        <ExchangePairsInput value={Math.floor(toCurrency * 100) / 100} />

                        <ExchangePairsSelect value={currencyOptionsSecond} onClick={changeSecondCurrencyOptions}>
                            {currenciesList.map(el => {
                                return (
                                    <MenuItem
                                        value={el.code}
                                        key={el.code}
                                    >
                                        {el.code}
                                    </MenuItem>
                                );
                            })}
                        </ExchangePairsSelect>
                    </ExchangePairsFromTo>
                </ExchangePairsInputsBlock>


            </ExchangePairsBlock>
        </ExchangePairsContainer>
    );
};

export default ExchangePairsComponent;