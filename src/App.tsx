import './App.css'
import {Select} from "./Select/Select";
import {useRef} from "react";


function App() {
    const selectRef = useRef()

    setTimeout(() => {
        const input = selectRef.current as HTMLInputElement
        console.log(input && input.getAttribute('value'))
    }, 5000)

    return (
        <>
            <label htmlFor='#select' className='label'>Users</label>
            <Select ref={selectRef}/>
        </>
    )
}

export default App
