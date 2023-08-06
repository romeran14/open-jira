import { FC, useReducer, useEffect } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import entriesApi from '../../entriesApi'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}


const EntriesProvider: FC = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)
    const { enqueueSnackbar } = useSnackbar()

    const router = useRouter()

    const addNewEntry = async (description: string) => {
        const { data } = await entriesApi.post<Entry>('/entries', { description })
        // console.log(newEntry)
        dispatch({ type: "[Entry] Add-Entry", payload: data })
    }

    const updateEntry = async ({ _id, description, status }: Entry, showSnack = false) => {

        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status })
            dispatch({ type: '[Entry] Entry-Updated', payload: data })
            
            if (showSnack) {
                enqueueSnackbar('Entrada actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
            }

        } catch (error) {
            console.log(error)
        }
    }

    const deleteEntry = async ({ _id }: Entry) => {

        try {
            const { data } = await entriesApi.delete<Entry>(`/entries/${_id}`)
            dispatch({ type: '[Entry] Entry-Deleted', payload: data })
            
            router.replace('/')
        } catch (error) {
            console.log(error)
        }
    }

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries')
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
            updateEntry,
            deleteEntry
        }}>
            {children}
        </EntriesContext.Provider>
    )
}

export default EntriesProvider