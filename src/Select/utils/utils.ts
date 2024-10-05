import {IUser} from "../types/types";

export const convertLabel = (item: IUser | undefined) => item ? `${item?.last_name} ${item?.first_name}, ${item?.job || '-'}` : '';
export const getFirstLetter = (item: IUser | undefined) => item ? item.last_name[0].toUpperCase() : '';
export const getUrl = (page: number) => `https://frontend-test-middle.vercel.app/api/users?page=${page}&limit=50`
export const getById = (options: IUser[], id: number) => options.find((item) => item.id===id)
