import { FC,useContext, useMemo, DragEvent } from 'react';
import { Paper, List } from '@mui/material';
import { EntryCard } from './EntryCard';
import { EntryStatus } from '../../interfaces';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';
import styles from "./EntryList.module.css"

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {

  const { entries, updateEntry } = useContext(EntriesContext)
  const { isDragging , endDraggin} = useContext(UIContext)

  const entriesByStatus = useMemo(()=> entries.filter( entry => entry.status === status) ,[entries])
   
  const allowDrop = (event:DragEvent)=> {
    event.preventDefault()
  }

  const onDropEntry = (event:DragEvent)=> {
    const id = event.dataTransfer.getData('text')
    const entry = entries.find( e => e._id === id )!;
    entry.status=status
    updateEntry( entry )
    endDraggin()
  }

    return (
        <div
        onDrop={onDropEntry}
        onDragOver={allowDrop}
        className={isDragging? styles.dragging :''}
        >
            <Paper sx={{ height: 'calc(100vh - 250px)', overflow: 'scroll', backgroundColor: 'transparent', padding:"1px 5px" }} >
                <List sx={{ opacity: isDragging? 0.4 : 1 , transition: 'all 0.3s' }}>
                    {
                        entriesByStatus.map( entry =>
                            (
                                <EntryCard key={entry._id} entry={entry} ></EntryCard>
                            ))
                    }
                    
                </List>
            </Paper>
        </div>
    )
}