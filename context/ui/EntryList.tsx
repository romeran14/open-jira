import { FC } from 'react';
import { Paper, List } from '@mui/material';
import { EntryCard } from './EntryCard';

interface Props {
    prop?: string
}

export const EntryList: FC<Props> = ({ prop }) => {
    return (
        <div>
            <Paper sx={{ height: 'calc(100vh - 250px)', overflow: 'scroll', backgroundColor: 'transparent', padding:"1px 5px" }} >
                <List sx={{ opacity: 1 }}>
                    <EntryCard />
                </List>
            </Paper>
        </div>
    )
}