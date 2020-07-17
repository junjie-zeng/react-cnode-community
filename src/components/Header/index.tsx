import React from 'react'

interface Props {
    left: any;
    center: string;
    right: any
}

function Header(props: Props) {
    return (
        <div className="header">
            <div className="header-left"><em>《</em></div>
            <div className="header-center">{props.center}</div>
            <div className="header-right"><em>*</em></div>
        </div>

    )
}

export default Header