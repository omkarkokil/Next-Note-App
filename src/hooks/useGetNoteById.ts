import getNotesById from "@/app/actions/getNotesById"
import useModal from "./useModal"
import { useCallback, useEffect, useMemo, useState } from "react"
import axios from "axios"
import { Notes, User } from "@prisma/client"

export type NoteData = {
    title: string,
    desc: string,
    id: string,
    createdAt: string
}


export const useGetNoteById = (id: string) => {

    const [data, setData] = useState<NoteData>({
        title: "",
        desc: "",
        id: "",
        createdAt: ""

    })

    const getData = async () => {
        if (id) {
            const note = await axios.get<NoteData>(`/api/notes/${id}`)
            setData({
                title: note.data.title,
                desc: note.data.desc,
                id: note.data.id,
                createdAt: note.data.createdAt
            })
        }
    }

    useEffect(() => {
        getData()
    }, [id])

    return data
}