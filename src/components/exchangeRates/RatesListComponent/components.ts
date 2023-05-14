import styled from "styled-components";
import {Button, Container} from "@mui/material";

export const ExchangeListContainer = styled(Container)(() => ({
    margin: '45px auto',
    border: '1px solid #bebebe',
    borderRadius: 4,
    padding: '10px 40px 10px 40px',
    boxShadow: '1px 1px 15px gray',

    '&.MuiContainer-root': {
        maxWidth: 650,
    }
}));

export const ExchangeDescriptionBlock = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'space-between'
}))

export const ExchangeValuesDescription = styled('h3')(() => ({}))

export const ExchangeList = styled('ul')(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '100%',
    borderBottom: '1px solid black',
    padding: 0,
}))

export const ExchangeListItemName = styled('li')(() => ({
    listStyleType: 'none',
    paddingBottom: 13,
}))

export const ExchangeListItemValue = styled('li')(() => ({
    listStyleType: 'none',
    paddingBottom: 13,
    fontWeight: 500,
}))

export const ExchangeValueAndButtonBlock = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}))

export const ExchangeValue = styled('h2')(() => ({
    color: '#909090'
}))

export const ExchangeUpdateButton = styled(Button)(() => ({
    '&.MuiButton-root': {
        "&:hover": {
            backgroundColor: "#FFF"
        },
    },
}))