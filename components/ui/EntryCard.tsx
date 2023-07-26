import { FC, DragEvent, useContext } from 'react';
import {Card, CardActionArea, CardActions, CardContent, Typography} from '@mui/material';
import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui';

interface Props {
  entry:Entry
}

export const EntryCard :FC<Props>= ({entry}) => {

  const {startDraggin, endDraggin} = useContext(UIContext)

const onDragStart = ( event: DragEvent ) =>{

   event.dataTransfer.setData('text', entry._id)
   startDraggin()
}

const onDragEnd =()=>{
  endDraggin()
}

  return (
    <Card
    draggable
    onDragStart={ onDragStart }
    onDragEnd={ onDragEnd }
    sx={{marginBottom:1}}>
        <CardActionArea>
            <CardContent>
                <Typography sx={{ whiteSpace: 'pre-line' }} >{entry.description}</Typography>
            </CardContent>
            <CardActions sx={{display:'flex',paddingRight:'2', justifyContent:'end'}} >
                <Typography variant='body2' >hace 30 minutos</Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
}