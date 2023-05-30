import React, { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react';
import {
    ExchangePairsBlock,
    ExchangePairsContainer,
    ExchangePairsFromTo,
    ExchangePairsInput,
    ExchangePairsInputsBlock,
    ExchangePairsSelect, ExchangePairsSwiperButton,
    ExchangePairsTitle,
    HomeButton,
} from './components';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { useBaseCurrency } from '../../providers/CurrenciesProvider';
import { Currencies, getCurrencyRates } from '../../api';
import { Link } from 'react-router-dom';
import { MenuItem } from '@mui/material';


const ExchangePairsComponent = () => {

    let date = new Date();

    const { currenciesList, baseCurrency } = useBaseCurrency();

    const [rates, setRates] = useState<typeof values>({});

    let values: any = (Object.keys(rates) as Array<keyof typeof rates>)

    const [currencyOptionsFirst, setCurrencyOptionsFirst] = useState<string>(baseCurrency);
    const [currencyOptionsSecond, setCurrencyOptionsSecond] = useState<string>('RUB');
    const [fromCurrency, setFromCurrency] = useState<number>(0);
    const [toCurrency, setToCurrency] = useState<number>(0);

    const getCurrencyRatesFromApi = async () => {
        const result = await getCurrencyRates(baseCurrency);
        setRates(result);
    };

    useEffect(() => {
        getCurrencyRatesFromApi();
    }, [baseCurrency]);

    const changeFirstCurrencyOptions = (event: any) => {
        setCurrencyOptionsFirst(event.target.innerText);
    };

    const changeSecondCurrencyOptions = (event: any) => {
        setCurrencyOptionsSecond(event.target.innerText);
    };

    const inputValFirst = (e: ChangeEvent<HTMLInputElement>) => {
        setFromCurrency(Number(e.target.value))
        setToCurrency(Number(e.target.value) * (rates[currencyOptionsSecond]))
    };

    const inputValSecond = (e: ChangeEvent<HTMLInputElement>) => {
        setToCurrency(Number(e.target.value))
        setFromCurrency(Number(e.target.value) * (rates[currencyOptionsSecond]))
    };

    const handleSwipeCurrencies = () => {
        if (currencyOptionsFirst !== currencyOptionsSecond) {
            setCurrencyOptionsFirst(currencyOptionsSecond);
            setCurrencyOptionsSecond(currencyOptionsFirst);
            setFromCurrency(toCurrency)
            setToCurrency(fromCurrency)
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
                        <ExchangePairsInput value={Math.floor(fromCurrency * 100) / 100}  onChange={inputValFirst}/>

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

                    <ExchangePairsSwiperButton onClick={handleSwipeCurrencies}>
                        <SyncAltIcon />
                    </ExchangePairsSwiperButton>

                    <ExchangePairsFromTo>
                        <ExchangePairsInput value={Math.floor(toCurrency * 100) / 100} onChange={inputValSecond}/>

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

            <Link to={'/'}>
                <HomeButton variant={'contained'}>
                    Home
                </HomeButton>
            </Link>
        </ExchangePairsContainer>
    );
};

export default ExchangePairsComponent;