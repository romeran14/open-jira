import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data =
    | { message: string } |
    IEntry | null


export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    const { id } = req.query

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'El id no es valido' + id })

    }
    switch (req.method) {
        case 'PUT':

            return updateEntry(req, res);
        case 'GET':

            return returnEntry(req, res);
            case 'DELETE':

            return deleteEntry(req, res);

        default:
            return res.status(400).json({ message: 'Metodo no existe' })
    }

}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;

    await db.connect()

    const entryToUpdate = await Entry.findById(id)

    if (!entryToUpdate) {
        return res.status(400).json({ message: 'No hay entrada con ese ID' + id })
    }

    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status
    } = req.body


    try {
        const updateEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true })
        // entryToUpdate.description = description
       //  entryToUpdate.status= status
       //  entryToUpdate.save()
       await db.disconnect()
       res.status(200).json(updateEntry!)

    } catch (error:any) {
        console.log(error)
        await db.disconnect() 
        res.status(400).json({ message: error.errors.status.message})
    }

    
}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;

    await db.connect()

    const entryToUpdate = await Entry.findById(id)

    if (!entryToUpdate) {
        return res.status(400).json({ message: 'No hay entrada con ese ID' + id })
    }


    try {
        
        const deletedEntry = await Entry.findByIdAndDelete(id)

       await db.disconnect()
       res.status(200).json(deletedEntry)

    } catch (error:any) {
        console.log(error)
        await db.disconnect() 
        res.status(400).json({ message: error.errors.status.message})
    }

    
}


const returnEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;

    await db.connect()

    const entryToReturn = await Entry.findById(id)
    await db.disconnect()
    if (!entryToReturn) {
        return res.status(400).json({ message: 'No hay entrada con ese ID' + id })
    }


    try {

       res.status(200).json(entryToReturn)

    } catch (error:any) {
        console.log(error)
        res.status(400).json({ message: error.errors.status.message})
    }

    
}