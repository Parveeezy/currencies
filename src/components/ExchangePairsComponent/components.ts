import styled from 'styled-components';
import { Button, Container, Select, TextField } from '@mui/material';

export const ExchangePairsContainer = styled(Container)(() => ({
    textAlign: 'center',
    '&.MuiContainer-root': {
        width: 700,
        height: 450,
        borderRadius: 4,
        padding: 20,
        marginTop: 20,
    },
}));

export const ExchangePairsBlock = styled('div')(() => ({
    marginTop: 20,
    paddingTop: 40,
    height: '50%',
    border: '1px',
    borderRadius: 4,
    boxShadow: '1px 1px 15px gray',
}));

export const ExchangePairsTitle = styled('h2')(() => ({}));

export const ExchangePairsInputsBlock = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

export const ExchangePairsFromTo = styled('div')(() => ({
    marginRight: 10,
    marginLeft: 10,
}));

export const ExchangePairsInput = styled(TextField)(() => ({
    width: 150,
    '& fieldset': {
        borderRadius: '4px 0px 0px 4px',
    },
}));

export const ExchangePairsSelect = styled(Select)(() => ({
    width: 90,
    '& fieldset': {
        borderRadius: '0px 4px 4px 0px',
    },
}));

export const ExchangePairsSwiperButton = styled(Button)(() => ({}));


export const HomeButton = styled(Button)(() => ({
    '&.MuiButtonBase-root': {
        marginTop: 25,
    },
    '& a': {
        color: '#fff',
        textDecoration: 'none'
    }
}));