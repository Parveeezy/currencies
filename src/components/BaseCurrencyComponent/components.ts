import styled from "styled-components";
import {Button, Container} from "@mui/material";
import { Link } from 'react-router-dom';

export const CurrenciesInputContainer = styled(Container)(() => ({
    marginTop: 25,

    '&.MuiContainer-root': {
        maxWidth: 700,
        textAlign: 'center',
        display: 'flex',
    }
}));

export const LinkTo = styled(Link)(() => ({
    textDecoration: 'none',
    color: '#fff',
}));

export const ExchangeButtonPage = styled(Button)(() => ({
    '&.MuiButton-root': {
        marginLeft: 10,
        height: '100%',
        padding: 0
    }
}));