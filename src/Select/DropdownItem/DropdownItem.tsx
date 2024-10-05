import './DropdownItem.css'
import {convertLabel, getFirstLetter} from "../utils/utils";
import {IUser} from "../types/types";
import {FC, memo} from "react";

interface IProps {
    user: IUser,
    selected: boolean
}

const DropdownItem: FC<IProps> = ({user, selected}) => (
    <li>
        <button type="button" data-selected={user.id}
                className={`dropdown__item ${selected ? "dropdown__item_selected" : ''}`}>
            <div className='dropdown__itemLogo'>
                <span>{getFirstLetter(user)}</span>
            </div>
            {convertLabel(user)}
        </button>
    </li>
)

export default memo(DropdownItem)

