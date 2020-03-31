import React from 'react';
import withDataFetching from '../withDataFetching';

const ItemsContext = React.createContext();

const ItemsContextProvider = ({ children, data }) => (
    <ItemsContext.Provider value={{ items: data }}>
        { children }
    </ItemsContext.Provider>
);

export default withDataFetching({
    dataSource: 'https://my-json-server.typicode.com/reardek/shopping-list-react/items',})(ItemsContextProvider);

export { ItemsContext };