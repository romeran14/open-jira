import { EntriesState } from './'
import { Entry } from '../../interfaces'

type EntriesActionType =
    | { type: '[Entry] Add-Entry', payload: Entry }
    | { type: '[Entry] Entry-Updated', payload: Entry }

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
    console.log("swich", action.payload)
    switch (action.type) {
        case '[Entry] Add-Entry':
            console.log('add entry')
            return {
                ...state,
                entries: [...state.entries, action.payload]
            }
        case '[Entry] Entry-Updated':
            console.log('AQUI', action.payload)
            return {
                ...state,
                entries: state.entries.map(entry => {
                    console.log('AQUI veeeee')
                    if (entry._id === action.payload._id) {
                        entry.status = action.payload.status;
                        entry.description = action.payload.description;

                    }
                    return entry
                })
            }

        default:
            console.log('default')
            return state
    }

}