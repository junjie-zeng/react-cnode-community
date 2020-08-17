import React from 'react'

interface Props {
    left: any;
    center: string;
    right: any
}

function Header(props: Props) {
    return (
        <header className="header">
            <div className="back">
                <em className="iconfont icon-fanhui"></em>
            </div>
            <div className="wrap">
                <span style={{ background: 'goldenrod' }}></span>
                <em>cnode-js</em>
            </div>
            <div className="other">
                <em className="iconfont icon-shoucang"></em>
            </div>
        </header>

    )
}

export default Header