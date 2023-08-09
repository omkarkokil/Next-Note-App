import { create } from "zustand";


interface ModalProps {
    id: string
    toggleModal: (id: string) => void

}

const useModal = create<ModalProps>((set) => ({
    id: "",
    toggleModal: (id) => set({ id: id })
}))


export default useModal