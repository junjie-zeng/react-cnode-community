import React from 'react'
interface Props {
    isShow: boolean,
}
function RefreshLoading(props: Props) {
    // console.log(props)
    return props.isShow ?
        <div className="refresh-loading-box">
            <div className="refresh-loading">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div> : null
}

export default RefreshLoading