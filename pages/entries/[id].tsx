import { IconButton, capitalize, Grid, Card, CardHeader, CardContent, TextField, CardActions, Button, Radio, FormControl, FormControlLabel, FormLabel, RadioGroup } from "@mui/material";
import { Layout } from "../../components/layouts";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Entry, EntryStatus } from "../../interfaces";
import {  GetServerSideProps } from "next";
import { useState, ChangeEvent, useMemo, FC, useContext } from 'react';
import {dbEntries} from '../../database'
import { EntriesContext } from "../../context/entries";
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props{
  entry:Entry
}

const EntryPage: FC<Props> = ( { entry } ) => {

    const [inputValue, setInputValue] = useState( entry.description )
    const [status, setStatus] = useState<EntryStatus>( entry.status )
    const [touched, setTouched] = useState(false)

    const {updateEntry} = useContext(EntriesContext)

   const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

    const onInputValueChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const onStatusChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value as EntryStatus)
    }

    const onSave = () => {
        if ( inputValue.trim().length  === 0) return

        const updatedEntry:Entry ={
            ...entry,
            status,
            description: inputValue
        }

        updateEntry( updatedEntry, true )
    }

    return (
        <Layout title={`${inputValue.substring(0,20) + '...'} `}>
            <Grid
                container
                justifyContent={'center'}
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader title={`Entrada ${inputValue}`} subheader={`Creada hace ${ dateFunctions.getFormatDistanceToNow(entry.createdAt) }`} >

                        </CardHeader>
                        <CardContent>
                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder="Nueva Entrada"
                                autoFocus
                                multiline
                                label="Nueva Entrada"
                                value={inputValue}
                                onChange={onInputValueChanged}
                                helperText={isNotValid && 'Ingrese un valor'}
                                onBlur={() => setTouched(true)}
                                error={isNotValid}
                            />
                            {/*RADIO */}
                            <FormControl>
                                <FormLabel>Estado</FormLabel>
                                <RadioGroup
                                    row
                                    value={status}
                                    onChange={onStatusChanged}
                                >
                                    {validStatus.map(option => (
                                        <FormControlLabel key={option} value={option} control={<Radio />} label={capitalize(option)} />


                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button disabled={ inputValue.length <= 0 } startIcon={<SaveOutlinedIcon />} onClick={onSave} variant="contained" fullWidth>
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <IconButton sx={{
                position: 'fixed',
                bottom: 30,
                right: 30,
                backgroundColor: 'error.dark'
            }} >
                <DeleteOutlinedIcon />


            </IconButton>
        </Layout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const { id } = params as {id:string}  // your fetch function here 

    const entry = await dbEntries.getEntryById(id)

    if( !entry ){
        return{
            redirect:{
                destination:'/',
                permanent:false,
            }
        }
    }

    return {
        props: {
           entry 
        }
    }
}

export default EntryPage