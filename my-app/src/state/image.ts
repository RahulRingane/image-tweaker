import { atom } from "recoil";
import { Images } from "../schema/image";


export const imagesState = atom<Images>({
    key: "images",
    default: []
})