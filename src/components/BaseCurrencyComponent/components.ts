import styled from "styled-components";
import {Button, Container} from "@mui/material";

export const CurrenciesInputContainer = styled(Container)(() => ({
    marginTop: 25,

    '&.MuiContainer-root': {
        maxWidth: 700,
        textAlign: 'center',
        display: 'flex',
    }
}));

export const ExchangeButtonPage = styled(Button)(() => ({
    '&.MuiButton-root': {
        marginLeft: 10
    }
}));