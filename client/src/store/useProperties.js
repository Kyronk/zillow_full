import {create} from "zustand";
import { apiGetPropertyType } from "../apis/propertyType";


export const usePropertiesStore = create((set) => ({
    propertyTypes: [],
    // contentModal: null,
    // setModal: (isShowModal, contentModal) => set(() => ({isShowModal, contentModal}))
    getPropertyTypes: async (params) => {
        const response = await apiGetPropertyType(params);
        console.log(response);
        if(response.success) return set(() => ({ propertyTypes: response.propertyTypes}));
        else return set(() => ({ propertyTypes: [] }))
    },
}))