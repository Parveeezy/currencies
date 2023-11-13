import React, { ChangeEvent, useEffect, useState } from 'react';

import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { Link } from 'react-router-dom';
import { CircularProgress, MenuItem } from '@mui/material';

import {
    ExchangePairsBlock,
    ExchangePairsContainer,
    ExchangePairsFromTo,
    ExchangePairsInput,
    ExchangePairsInputsBlock,
    ExchangePairsSelect,
    ExchangePairsSwiperButton,
    ExchangePairsTitle,
    HomeButton,
} from './components';

import { useBaseCurrency } from '../../providers/CurrenciesProvider';

import { getCurrencyRates } from '../../api';

import moment from 'moment';

const ExchangePairsComponent = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { currenciesList, baseCurrency } = useBaseCurrency();

    const [rates, setRates] = useState<typeof values>({});

    let values: any = (Object.keys(rates) as Array<keyof typeof rates>);

    const [currencies, setCurrencies] = useState({ from: baseCurrency, to: 'RUB' });
    const [fromCurrency, setFromCurrency] = useState<number>(1);

    const getCurrencyRatesFromApi = async (currency: string) => {
        setIsLoading(true);
        const result = await getCurrencyRates(currency);
        setRates(result);
        setIsLoading(false);
    };

    useEffect(() => {
        getCurrencyRatesFromApi(currencies.from);
    }, []);

    const changeFirstCurrencyOptions = async (event: any) => {
        setCurrencies(prev => ({ ...prev, from: event.target.value }));
        await getCurrencyRatesFromApi(event.target.value);
    };

    const changeSecondCurrencyOptions = (event: any) => {
        setCurrencies(prev => ({ ...prev, to: event.target.value }));
    };

    const inputValFirst = (e: ChangeEvent<HTMLInputElement>) => {
        setFromCurrency(Number(e.target.value));
    };

    const handleSwipeCurrencies = async () => {
        await getCurrencyRatesFromApi(currencies.to);
        setCurrencies(prev => ({ from: prev.to, to: prev.from }));
    };

    return (
        <ExchangePairsContainer>
            <ExchangePairsBlock>
                <ExchangePairsTitle>
                    CONVERTER AT THE RATE as of {moment().format("DD.MM.YYYY")}
                </ExchangePairsTitle>

                <ExchangePairsInputsBlock>
                    <ExchangePairsFromTo>
                        <ExchangePairsInput value={Math.floor(fromCurrency * 100) / 100} onChange={inputValFirst} />

                        <ExchangePairsSelect value={currencies.from} onChange={changeFirstCurrencyOptions}>
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

                    <ExchangePairsSwiperButton onClick={handleSwipeCurrencies}>
                        {isLoading ? <CircularProgress size={22} /> : <SyncAltIcon />}
                    </ExchangePairsSwiperButton>

                    <ExchangePairsFromTo>
                        <ExchangePairsInput value={Math.floor((Number(fromCurrency) * (rates[currencies.to] || 0)) * 100) / 100} />

                        <ExchangePairsSelect value={currencies.to} onChange={changeSecondCurrencyOptions}>
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

            <Link to={'/'}>
                <HomeButton variant={'contained'}>
                    Home
                </HomeButton>
            </Link>
        </ExchangePairsContainer>
    );
};

export default ExchangePairsComponent;