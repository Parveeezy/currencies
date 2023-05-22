import React, { ChangeEvent, useEffect, useState } from 'react';
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
import { getCurrencyRates } from '../../api';


const ExchangePairsComponent = () => {

    let date = new Date();

    const { currenciesList, baseCurrency } = use
    BaseCurrency();

    const [rates, setRates] = useState({});


    const getCurrencyRatesFromApi = async () => {
        const result = await getCurrencyRates(baseCurrency);
        setRates(result);
    };

    useEffect(() => {
        getCurrencyRatesFromApi();
    }, [baseCurrency]);

    console.log(rates);

    const [currencyValueFrom, setCurrencyValueFrom] = useState(0);
    const [currencyValueTo, setCurrencyValueTo] = useState(0);

    const [currencyItemFrom, setCurrencyItemFrom] = useState(baseCurrency);
    const [currencyItemTo, setCurrencyItemTo] = useState(baseCurrency);

//Ввод валюты
    const changeValueFrom = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrencyValueFrom(Number(event.target.value));
        setCurrencyValueTo(Number(event.target.value) * 2);

        if (currencyValueFrom < 0 || isNaN(currencyValueFrom)) {
            setCurrencyValueFrom(0);
        }
    };

    const changeValueTo = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrencyValueTo(Number(event.target.value));

        if (currencyValueTo < 0 || isNaN(currencyValueTo)) {
            setCurrencyValueTo(0);
        }
    };

//Выбор валюты
    const changeCurrencyItemFrom = (event: any) => {
        setRates(event.target.outerText);
        setCurrencyItemFrom(event.target.outerText);
    };

    const changeCurrencyItemTo = (event: any) => {
        setRates(event.target.outerText);
        setCurrencyItemTo(event.target.outerText);
    };

//Переключатель валют
    const handleChangeCurrencies = () => {
        if (currencyItemFrom !== currencyItemTo) {
            setCurrencyItemFrom(currencyItemTo);
            setCurrencyItemTo(currencyItemFrom);
        }
    };

    return (
        <ExchangePairsContainer>
            <ExchangePairsBlock>
                <ExchangePairsTitle>
                    CONVERTER AT THE RATE as of {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}
                </ExchangePairsTitle>

                <ExchangePairsInputsBlock>
                    <ExchangePairsFromTo>
                        <ExchangePairsInput value={currencyValueFrom} onChange={changeValueFrom} />

                        <ExchangePairsSelect value={currencyItemFrom} onClick={changeCurrencyItemFrom}>

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

                    <ExchangePairsSwiperButton onClick={handleChangeCurrencies}>
                        <SyncAltIcon />
                    </ExchangePairsSwiperButton>

                    <ExchangePairsFromTo>
                        <ExchangePairsInput value={currencyValueTo} onChange={changeValueTo} />

                        <ExchangePairsSelect value={currencyItemTo} onClick={changeCurrencyItemTo}>

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