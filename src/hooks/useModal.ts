import { create } from "zustand";


type modal = "form" | "note"

interface ModalProps {
    id: string
    toggleModal: (id: string, variant?: string) => void
    variant?: string

}

const useModal = create<ModalProps>((set) => ({
    id: "",
    variant: <modal>"form",
    toggleModal: (id, variant = "") => set({ id: id, variant: variant })
}))


export default useModal