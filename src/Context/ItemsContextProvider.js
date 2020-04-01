import React from 'react';

const ItemsContext = React.createContext();

const initialValue = {
    items: [],
    loading: true,
    error: ''
};

const reducer = (value, action) => {
    switch (action.type) {
        case 'GET_ITEMS_SUCCESS':
            return {
                ...value,
                items: action.payload,
                loading: false,
            };
        case 'GET_ITEMS_ERROR':
            return {
                ...value,
                items: [],
                loading: false,
                error: action.payload
            };
        default:
            return value;
    }
};

async function fetchData(dataSource) {
    try {
        const data = await fetch(dataSource);
        const dataJSON = await data.json();

        if (dataJSON) {
            return await ({ data: dataJSON, error: false });
        }
    }
    catch (error) {
        return ({ data: false, error: error.message });
    }
};

const ItemsContextProvider = ({ children }) => {
    const [value, dispatch] = React.useReducer(reducer, initialValue);

    const getItemsRequest = async id => {
        const result = await fetchData(`https://my-json-server.typicode.com/reardek/shopping-list-react/lists/${id}/items`);

        if (result.data && result.data.length) {
            dispatch({ type: 'GET_ITEMS_SUCCESS', payload: result.data });
        }
        else {
            dispatch({ type: 'GET_ITEMS_ERROR', payload: result.error });
        }
    }

    return (
    <ItemsContext.Provider value={{ ...value, getItemsRequest }}>
        { children }
    </ItemsContext.Provider>
    );
};

export default ItemsContextProvider;

export { ItemsContext };