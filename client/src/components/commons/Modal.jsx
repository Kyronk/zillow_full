import React from 'react'

// redux zustand
import { useAppStore } from "../../store/useAppStore";

const Modal = () => {
    const { contentModal, setModal } = useAppStore();

    return (
        <div 
            // className="absolute z-[999] flex items-center justify-center w-screen h-screen bg-overlay-50"
            className="fixed z-[999] flex items-center justify-center w-full h-full bg-overlay-50"
            onClick={() => setModal(false, null)}
            >
            {contentModal}
        </div>
    )
}

export default Modal