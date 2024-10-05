import {forwardRef, useCallback, useEffect, useMemo, useState} from "react";
import './Select.css';
import {Dropdown} from "./Dropdown/Dropdown";
import {IUser, TUsersResponse} from "./types/types";
import {convertLabel, getById, getUrl} from "./utils/utils";
import DropdownItem from "./DropdownItem/DropdownItem";

export const Select = forwardRef((props, ref) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [options, setOptions] = useState<Array<IUser>>([]);
    const [selected, setSelected] = useState<number>(null);
    const [page, setPage] = useState(1);
    const [errorInfo, setErrorInfo] = useState<string>(null);
    const [loaderInfo, setLoaderInfo] = useState<string>(null);
    const [isNotAllFetched, setIsNotAllFetched] = useState(true);
    const [scrollPosition, setScrollPosition] = useState<number>(0)

    const list = useMemo(() =>
            options.map((user) => (
                <DropdownItem user={user} selected={user.id === selected}
                              key={user.id}/>
            ))
        , [options, selected])

    const handleToggleExpanded = () => {
        setIsExpanded(!isExpanded)
    }

    const handleSelect = useCallback((id: number, position: number) => {
        setScrollPosition(position)
        setSelected(id)
        setIsExpanded(false)
    }, [])

    const getPage = () => {
        setLoaderInfo('... грузим');

        return fetch<Promise<Response>>(getUrl(page))
            .then((res) => {
                if (res.ok) return res.json() as TUsersResponse

                return Promise.reject()
            })
            .then(res => {
                if (res.meta.to === res.meta.total) setIsNotAllFetched(false)
                setOptions(prev => [...prev, ...res?.data])
                setPage(prev => prev + 1)
                setLoaderInfo(null)
            })
            .catch(() => {
                setLoaderInfo(null)
                setErrorInfo("... не удалось подгрузить список")
            })
    }

    useEffect(() => {
        if (isExpanded && options.length === 0) getPage()
    }, [isExpanded])

    return (
        <div className="select">
            <input id="select" ref={ref} className="select__input"
                   defaultValue={convertLabel(getById(options, selected))}
                   onClick={handleToggleExpanded} placeholder="Choose user"/>
            {isExpanded &&
            <Dropdown addPage={getPage} onSelect={handleSelect} position={scrollPosition}
                      isNotAllFetched={isNotAllFetched}>
                {list}
                {loaderInfo || errorInfo}
            </Dropdown>}
        </div>
    )
})

Select.displayName = 'Select'

