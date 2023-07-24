import { FC, PropsWithChildren, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import { v4 as uuidv4 } from 'uuid';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Pendiente: lorem10orem10orem10orem10orem10orem10orem10',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description: 'En progreso: lorem10sdgdsgsgdsgsgsgsdgsgsgsg0orem10',
            status: 'in-progress',
            createdAt: Date.now() - 100000,
        },
        {
            _id: uuidv4(),
            description: 'Finished: lorem10sdgdsgsgsgsdgsg10orem10orem10',
            status: 'finished',
            createdAt: Date.now(),
        },
    ],
}


const EntriesProvider: FC = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    const addNewEntry = (description: string):void => {
       const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: 'pending',
        }
       // console.log(newEntry)
        dispatch({ type:"[Entry] Add-Entry", payload:newEntry })
    }

  return (
        <EntriesContext.Provider value={{
            ...state,
            //Methods
            addNewEntry
        }}>
            {children}
        </EntriesContext.Provider>
    )
}

export default EntriesProvider