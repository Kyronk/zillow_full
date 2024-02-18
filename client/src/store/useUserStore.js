import {create} from "zustand";

import { persist, createJSONStorage } from 'zustand/middleware'

import {apiGetCurrent} from "../apis/user";
// export const useUserStore = create(() => ({
//     token: null,
//     current: null,
// }))

export const useUserStore = create(persist(
    (set, get) => ({
        token: null,
        current: null,
        setToken: (token) => set(() => ({token} )),
        getCurrent : async () => {
            const response = await apiGetCurrent();
            // console.log(user)
            if(response.success) return set(() => ({ current: response.currentUser}))
            else {return set(() => ({current: null}))}
        }
    }),
    {
        name: 'rest06',
        storage: createJSONStorage(() => localStorage),
        // return object of states , want save
        partialize:(state) => (Object.fromEntries(
            Object.entries(state).filter((el) => el[0] === "token" || el[0] === "current")
        ))
    }
    )
);