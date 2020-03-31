import React from 'react';

const ListsContext = React.createContext();

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

const ListsContextProvider = ({ children }) => {
    const [lists, setLists] = React.useState([]);
    React.useEffect(() => {
        const asyncFetchData = async dataSource => {
            const resut = await fetchData(dataSource);

            setLists([...resut.data])
        };
        
        asyncFetchData('https://my-json-server.typicode.com/reardek/shopping-list-react/lists');
    });

    return (
        <ListsContext.Provider value = {{ lists }}>
        {children}
        </ListsContext.Provider>
    )
    
};

export default ListsContextProvider;

export { ListsContext };