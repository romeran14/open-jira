import { FC, useState, ChangeEvent, useContext } from 'react';
import { Button, Box, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

interface Props {
    prop?: string
}

export const NewEntry: FC<Props> = () => {

 

    const [inputValue, setinputValue] = useState('')

    const [touched, setTouched] = useState(false)

    const { addNewEntry } = useContext(EntriesContext)
    const { isAddingEntry, setIsAddingEntry } = useContext(UIContext)

    const onTextFieldChanged = (e:ChangeEvent<HTMLInputElement>) =>{
       setinputValue( e.target.value )
    }

    const onSave = () =>{
        if ( inputValue.length === 0 ) {
            return
        }
        addNewEntry(inputValue)
        setIsAddingEntry(false)
        setTouched(false)
        setinputValue('')
     }


    return (
        <>
            <Box sx={{ marginBottom: 2, paddingX: 1 }} >
                {
                    isAddingEntry ? (<>
                        <TextField
                            fullWidth
                            sx={{ marginTop: 2, marginBottom: 1 }}
                            placeholder='Nueva entrada'
                            autoFocus
                            multiline
                            label='Nueva Entrada'
                            helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
                            error={inputValue.length <= 0 && touched}
                            value={inputValue}
                            onChange={onTextFieldChanged}
                            onBlur={ ()=>setTouched(true) }
                        />
                        <Box display={'flex'} justifyContent={'space-between'} >
                            <Button
                                variant='outlined'
                                onClick={()=>setIsAddingEntry(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant='outlined'
                                color='secondary'
                                endIcon={<SaveIcon />}
                                onClick={onSave}
                            >
                                Guardar
                            </Button>
                        </Box>

                    </>) : 

                    <Button
                        fullWidth
                        variant='outlined'
                        endIcon={<LibraryAddIcon />}
                        onClick={()=>setIsAddingEntry(true)}
                       >Agregar Tarea
                    </Button>

                }
            </Box>


        </>
    )
}