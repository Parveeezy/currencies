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


const ExchangePairsComponent = () => {

    let date = new Date();

    const { currenciesList, baseCurrency } = useBaseCurrency();

    const [currencyValueFrom, setCurrencyValueFrom] = useState(0);
    const [currencyValueTo, setCurrencyValueTo] = useState(0);

    const [currencyItemFrom, setCurrencyItemFrom] = useState('USD');
    const [currencyItemTo, setCurrencyItemTo] = useState('RUB');


    const changeValueFrom = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrencyValueFrom(Number(event.target.value) * currencyValueTo)
    };

    const changeValueTo = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrencyValueTo(Number(event.target.value))
    };

    const changeCurrencyItemFrom = (event: any) => {
        setCurrencyItemFrom(event.target.outerText)
    };

    const changeCurrencyItemTo = (event: any) => {
        setCurrencyItemTo(event.target.outerText)
    };

    const handleChangeCurrencies = () => {
        if(currencyItemFrom !== currencyItemTo) {
            setCurrencyItemFrom(currencyItemTo)
            setCurrencyItemTo(currencyItemFrom)
        }
    };

    useEffect(() => {
        setCurrencyValueFrom()
    }, [changeValueFrom, changeValueTo]);

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
                        <ExchangePairsInput value={currencyValueTo} onChange={changeValueTo}/>

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