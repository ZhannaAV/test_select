export type TUsersResponse = {
    data: Array<IUser>;
    meta: {
        from: number; // порядковый номер первого возвращаемого элемента
        to: number; // порядковый номер последнего возвращаемого элемента
        total: number; // общее количество данных
    };
}

export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    job?: string;
}

export type TEvent<T extends HTMLElement = HTMLElement & HTMLUListElement & HTMLButtonElement> = Event & {
    target: T;
    currentTarget: T;
}
