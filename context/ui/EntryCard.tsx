import { FC } from 'react';
import {Card, CardActionArea, CardActions, CardContent, Typography} from '@mui/material';

interface Props {
  prop?:string
}

export const EntryCard :FC<Props>= ({prop}) => {
  return (
    <Card sx={{marginBottom:1}}>
        <CardActionArea>
            <CardContent>
                <Typography sx={{ whiteSpace: 'pre-line' }} >Esto es la descripcion</Typography>
            </CardContent>
            <CardActions sx={{display:'flex',paddingRight:'2', justifyContent:'end'}} >
                <Typography variant='body2' >hace 30 minutos</Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
}