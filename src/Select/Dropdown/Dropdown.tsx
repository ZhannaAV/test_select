import {FC, useEffect, useLayoutEffect, useRef, useState} from "react";
import './Dropdown.css'
import * as React from "react";
import {TEvent, TUsersResponse} from "../types/types";

interface IProps {
    onSelect: (id: number, position: number) => void;
    addPage: () => Promise<TUsersResponse>;
    isNotAllFetched: boolean;
    position: number;
    children?: HTMLCollection | HTMLElement;
}

export const Dropdown: FC<IProps> = ({onSelect, addPage, position, isNotAllFetched, children}) => {
    const [isReadyAddPage, setIsReadyAddPage] = useState<boolean>(false)
    const listRef = useRef();

    const handleClick = (e: TEvent<HTMLButtonElement>) => {
        const id = e.target.getAttribute('data-selected')
        onSelect(Number(id), (listRef.current as HTMLUListElement).scrollTop)
    }

    const handleScroll = () => {
        const ul = listRef.current as HTMLUListElement
        if (ul.scrollHeight - ul.scrollTop < 200 && isNotAllFetched ) setIsReadyAddPage(true)
    }

    useLayoutEffect(() => {
        if(isReadyAddPage)  {
            addPage().finally(() => setIsReadyAddPage(false))
        }
    }, [isReadyAddPage])

    useEffect(() => {
        (listRef.current as HTMLUListElement).addEventListener('scroll', handleScroll);
        (listRef.current as HTMLUListElement).scrollTo(0, position)

        return function () {
            (listRef.current as HTMLUListElement)?.removeEventListener('scroll', handleScroll)
        }
    },[])

    return (
        <ul ref={listRef} className="dropdown" onClick={handleClick}>
            {children}
        </ul>

    )
}
