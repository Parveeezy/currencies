import styled from "styled-components";
import {Container} from "@mui/material";

export const CurrenciesInputContainer = styled(Container)(() => ({
    marginTop: 25,
    textAlign: 'center',

    '&.MuiContainer-root': {
        maxWidth: 700,
    }
}));