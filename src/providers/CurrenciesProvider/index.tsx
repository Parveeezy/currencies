import {createContext, useContext, useEffect, useState} from "react";
import {Currencies, getCurrencies} from "../../api";

interface BaseCurrencyInterface {
    baseCurrency: string,
    currenciesList: Currencies[],
    changeBaseCurrency: (value: string) => void,
};

const BaseCurrencyContext = createContext<BaseCurrencyInterface>({
    baseCurrency: "RUB",
    currenciesList: [],
    changeBaseCurrency: () => {},
});

const lsBaseCurrency = localStorage.getItem("baseCurrency");

export const BaseCurrencyProvider = ({ children }: any) => {
    const [currenciesList, setCurrenciesList] = useState<Currencies[]>([]);
    const [baseCurrency, setBaseCurrency] = useState<string>(lsBaseCurrency || "RUB");
    const [isLoading, setIsLoading] = useState(true);

    const getCurrenciesFromApi = async () => {
        const result = await getCurrencies();
        setCurrenciesList(result);
        setIsLoading(false);
    }

    useEffect(() => {
        getCurrenciesFromApi();
    }, []);

    const changeBaseCurrency = (value: string) => {
        localStorage.setItem("baseCurrency", value);
        setBaseCurrency(value);
    };

    if (isLoading) return null;

    return <BaseCurrencyContext.Provider value={{
        baseCurrency,
        currenciesList,
        changeBaseCurrency
    }}>
        {children}
    </BaseCurrencyContext.Provider>
};

export const useBaseCurrency = () => useContext(BaseCurrencyContext);
