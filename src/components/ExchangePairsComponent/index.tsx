import React, { ChangeEvent, useCallback, useState } from 'react';
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

    const { currenciesList, baseCurrency } = useBaseCurrency();

    const [rates, setRates] = useState({});


    // const [currencyValueFrom, setCurrencyValueFrom] = useState(0);
    // const [currencyValueTo, setCurrencyValueTo] = useState(0);

    const [currencyItemFrom, setCurrencyItemFrom] = useState('USD');
    const [currencyItemTo, setCurrencyItemTo] = useState('RUB');


    const getCurrencyRatesFromApi = async () => {
        const result = await getCurrencyRates(baseCurrency);
        setRates(result);
    };

    // const changeInputVal = (val1: ChangeEvent<HTMLInputElement>) => {
    //     setValue1(Number(val1.target.value))
    // }

    const changeCurrencyItemFrom = (val: any) => {
        setCurrencyItemFrom(val.target.outerText)
    };

    // const changeCurrencyItemTo = (val: any) => {
    //     setCurrencyItemTo(val.target.outerText)
    // };

    const changeCurrencyItemTo = useCallback((val: any) => {
        setCurrencyItemTo(val.target.outerText)
    }, [currencyItemTo])

    const handleChangeCurrencies = () => {
        if(currencyItemFrom !== currencyItemTo) {
            setCurrencyItemFrom(currencyItemTo)
            setCurrencyItemTo(currencyItemFrom)
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
                        {/*<ExchangePairsInput value={currencyValueFrom} onChange={changeInputVal} />*/}

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
                        {/*<ExchangePairsInput value={currencyValueTo} />*/}

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