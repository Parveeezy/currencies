import React, {useState} from 'react';
import {Autocomplete, TextField} from "@mui/material";
import {CurrenciesInputContainer, ExchangeButtonPage} from "./components";
import {Currencies} from "../../api";
import {useBaseCurrency} from "../../providers/CurrenciesProvider";

const BaseCurrencyComponent = () => {
    const { currenciesList, baseCurrency, changeBaseCurrency } = useBaseCurrency();
    const [value, setValue] = useState(currenciesList.find(curr => curr.code === baseCurrency) || null);

    const handleChangeSelect = (event: any, val: Currencies | null) => {
        changeBaseCurrency(val?.code || "");
        setValue(val);
    };

    return (
        <CurrenciesInputContainer>
            <Autocomplete
                sx={{ width: '85%' }}
                disablePortal
                id="combo-box-demo"
                options={currenciesList}
                isOptionEqualToValue={(option, value) => option.code === value.code}
                value={value}
                getOptionLabel={(option) => option.name}
                onChange={handleChangeSelect}
                renderInput={(params) => <TextField {...params} label="Base currency" />}
            />
        <ExchangeButtonPage variant="contained">
            Exchange
        </ExchangeButtonPage>
        </CurrenciesInputContainer>
    );
};

export default BaseCurrencyComponent;