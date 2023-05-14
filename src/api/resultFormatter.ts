export const formatCurrencies = (currencies: any) => {
    const currArray = Object.entries(currencies);

    return currArray.map((arr: any) => ({
        code: arr[0],
        name: arr[1].currency_name,
    }));
};
