import { FC, useReducer, useEffect } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import entriesApi from '../../entriesApi'


export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}


const EntriesProvider: FC = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    const addNewEntry = async (description: string) => {
       const {data} = await entriesApi.post<Entry>('/entries', { description })
        // console.log(newEntry)
        dispatch({ type: "[Entry] Add-Entry", payload: data })
    }

    const updateEntry = async ( { _id, description, status}: Entry) => {
        
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${ _id }`, { description, status})
            dispatch({ type: '[Entry] Entry-Updated', payload: data })
        } catch (error) {
            console.log(error)
        }

        //dispatch({type:'[Entry] Entry-Updated', payload:entry})
    }

    const refreshEntries = async()=>{
       const {data} = await entriesApi.get<Entry[]>('/entries')
       dispatch({ type: '[Entry] Refresh-DATA', payload: data })
    }

    useEffect(() => {
     refreshEntries()
    }, [])
    

    return (
        <EntriesContext.Provider value={{
            ...state,
            //Methods
            addNewEntry,
            updateEntry
        }}>
            {children}
        </EntriesContext.Provider>
    )
}

export default EntriesProvider