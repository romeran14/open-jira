import { FC, DragEvent, useContext } from 'react';
import {Card, CardActionArea, CardActions, CardContent, Typography} from '@mui/material';
import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui';
import { useRouter } from 'next/router';
import { dateFunctions } from '../../utils';

interface Props {
  entry:Entry
}

export const EntryCard :FC<Props>= ({entry}) => {

  const router = useRouter()

  const {startDraggin, endDraggin} = useContext(UIContext)

  const onDragStart = ( event: DragEvent ) =>{

   event.dataTransfer.setData('text', entry._id)
   startDraggin()
}

const onDragEnd =()=>{
  endDraggin()
}

const onClick = ()=>{
   router.push(`/entries/${entry._id}`)
}

  return (
    <Card
    onClick={onClick}
    draggable
    onDragStart={ onDragStart }
    onDragEnd={ onDragEnd }
    sx={{marginBottom:1}}>
        <CardActionArea>
            <CardContent>
                <Typography sx={{ whiteSpace: 'pre-line' }} >{entry.description}</Typography>
            </CardContent>
            <CardActions sx={{display:'flex',paddingRight:'2', justifyContent:'end'}} >
                <Typography variant='body2' >{'Hace'+ dateFunctions.getFormatDistanceToNow( entry.createdAt ) }</Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
}