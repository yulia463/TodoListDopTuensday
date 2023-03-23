import React, {useState} from "react";
import {UniversalSpanType} from "../Typisation";

export const UniversalSpan = (props:UniversalSpanType) => {
    const [rezim, setRezim] = useState(false)
    const [changeTitle, setChangeTitle] = useState(props.title)

    const onBlurHandlerForTasks = () => {
        setRezim(false)
        props.callback(changeTitle)
    }
    return (
        <div>
            {rezim
                ? <input
                    type={'text'}
                    onBlur={onBlurHandlerForTasks}
                    autoFocus
                    value={changeTitle}
                    onChange={(e) => {
                        setChangeTitle(e.currentTarget.value)
                    }}

                />
                : <span
                    onDoubleClick={() => {
                        setRezim(true)
                    }}
                > <b>{props.title}</b></span>
            }
        </div>
    )
}