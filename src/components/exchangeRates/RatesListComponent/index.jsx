import React, { useCallback, useEffect, useState } from 'react';
import {useBaseCurrency} from "../../../providers/CurrenciesProvider";
import {getCurrencyRates} from "../../../api";
import {
    ExchangeDescriptionBlock,
    ExchangeList,
    ExchangeListContainer,
    ExchangeListItemName,
    ExchangeListItemValue,
    ExchangeUpdateButton,
    ExchangeValue,
    ExchangeValueAndButtonBlock,
    ExchangeValuesDescription,
} from "./components";
import {Skeleton} from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import Timer from "../../Timer";

const RatesListComponent = () => {
    const {baseCurrency, currenciesList} = useBaseCurrency();
    const [rates, setRates] = useState({});

    const getCurrencyRatesFromApi = useCallback(async () => {
        const result = await getCurrencyRates(baseCurrency);
        setRates(result);
    }, [baseCurrency]);

    useEffect(() => {
        getCurrencyRatesFromApi();
    }, [baseCurrency]);

    const handleUpdateExchanges = async () => {
        getCurrencyRatesFromApi()
    };

    return (
        <ExchangeListContainer>

            <ExchangeValueAndButtonBlock>
                {
                    baseCurrency ? (
                        <ExchangeValue>
                            1 {baseCurrency}
                        </ExchangeValue>
                    ) : (
                        <ExchangeValue>
                            {}
                        </ExchangeValue>
                    )
                }
                <Timer getCurrency={getCurrencyRatesFromApi}/>
                <ExchangeUpdateButton
                    onClick={handleUpdateExchanges}
                >
                    <RefreshIcon/>
                </ExchangeUpdateButton>
            </ExchangeValueAndButtonBlock>


            <ExchangeDescriptionBlock>
                <ExchangeValuesDescription>Currency</ExchangeValuesDescription>
                <ExchangeValuesDescription>Value</ExchangeValuesDescription>
            </ExchangeDescriptionBlock>

            {Object.entries(rates).length ?
                (Object.entries(rates).map(rate => {
                            const current = currenciesList.find(curr => curr.code === rate[0]);
                            if (!current) return null;

                            return (
                                <ExchangeList key={rate[0]}>
                                    <ExchangeListItemName>
                                        {current.name}: &nbsp;
                                    </ExchangeListItemName>
                                    <ExchangeListItemValue>
                                        {Math.floor(rate[1] * 100) / 100} {rate[0]}
                                    </ExchangeListItemValue>
                                </ExchangeList>
                            );
                        }
                    )
                ) : (<><ExchangeList><Skeleton animation="wave"/></ExchangeList><Skeleton animation="wave"/><Skeleton animation="wave"/></>)
            }
        </ExchangeListContainer>
    );
};

export default RatesListComponent;