import React, {ChangeEvent, useState} from 'react';
import {
    ExchangePairsBlock,
    ExchangePairsContainer,
    ExchangePairsFromTo,
    ExchangePairsInput,
    ExchangePairsInputsBlock,
    ExchangePairsSelect,
    ExchangePairsSwiperButton,
    ExchangePairsTitle
} from "./components";
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import {useBaseCurrency} from "../../providers/CurrenciesProvider";
import {MenuItem} from "@mui/material";


const ExchangePairsComponent = () => {

    let date = new Date();

    const {currenciesList} = useBaseCurrency();

    const [value1, setValue1] = useState(0)
    const [value2, setValue2] = useState(0)

    const changeInputVal = (val1: ChangeEvent<HTMLInputElement>) => {
        setValue1(Number(val1.target.value))
    }

    return (
        <ExchangePairsContainer>
            <ExchangePairsBlock>
                <ExchangePairsTitle>
                    CONVERTER AT THE RATE as of {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}
                </ExchangePairsTitle>

                <ExchangePairsInputsBlock>
                    <ExchangePairsFromTo>
                        <ExchangePairsInput value={value1} onChange={changeInputVal}/>
                        <ExchangePairsSelect>
                            {Object.entries(currenciesList).map(el => {
                                return(
                                    <MenuItem value={el[1].code}>
                                        {el[1].code}
                                    </MenuItem>
                                )
                            })}
                        </ExchangePairsSelect>
                    </ExchangePairsFromTo>

                    <ExchangePairsSwiperButton>
                        <SyncAltIcon/>
                    </ExchangePairsSwiperButton>

                    <ExchangePairsFromTo>
                        <ExchangePairsInput value={value2}/>
                        <ExchangePairsSelect>
                            {Object.entries(currenciesList).map(el => {
                                return(
                                    <MenuItem
                                        value={el[1].code}
                                        key={el[1].code}
                                    >
                                        {el[1].code}
                                    </MenuItem>
                                )
                            })}
                        </ExchangePairsSelect>
                    </ExchangePairsFromTo>
                </ExchangePairsInputsBlock>


            </ExchangePairsBlock>
        </ExchangePairsContainer>
    );
};

export default ExchangePairsComponent;