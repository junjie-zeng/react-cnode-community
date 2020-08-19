import React from 'react'

interface Props {
    title?: string;
    icon2?: string;
    backFun?: any//Function;
    iconFun?: any//Function;;
    portrait?: string;
}

function Header(props: Props) {
    const { title, icon2, backFun, iconFun, portrait } = props
    const isBackFun = backFun ? 'visible' : 'hidden'
    const isPortrait = portrait ? 'inline-block' : 'none'
    const isIcon2 = icon2 ? 'visible' : 'hidden'
    //console.log(backFun)
    return (
        <header className="header">
            <div className="back" onClick={backFun} style={{ visibility: isBackFun }}>
                <em className="iconfont icon-fanhui"></em>
            </div>
            <div className="wrap">
                <span style={{ background: `url(${portrait})`, display: isPortrait }}></span>
                <em>{title}</em>
            </div>
            <div className="other" onClick={iconFun} style={{ visibility: isIcon2 }}>
                <em className={icon2 ? `iconfont ${icon2}` : `iconfont`}></em>
            </div>
        </header>
    )
}

export default Header