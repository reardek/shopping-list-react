import React from 'react';
import withDataFetching from '../withDataFetching';

const ListsContext = React.createContext();

const ListsContextProvider = ({ children, data }) => (
    <ListsContext.Provider value = {{ lists: data }}>
        {children}
    </ListsContext.Provider>
);

export default withDataFetching({
    dataSource: 'https://my-json-server.typicode.com/reardek/shopping-list-react/lists',
})(ListsContextProvider);

export { ListsContext };