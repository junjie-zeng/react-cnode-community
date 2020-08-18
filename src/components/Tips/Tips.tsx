import React from 'react'
interface Props {
    children: any,
    isShow: boolean,
    lei: string
}
function Tips(props: Props) {
    // console.log(props)
    return props.isShow ? <div className={props.lei}>{props.children}</div> : null
}

export default Tips