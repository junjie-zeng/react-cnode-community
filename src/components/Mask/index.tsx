import React from 'react'
import { setMask } from '../../store/action'
import { connect } from 'react-redux'
interface Props {
    setMask: Function
    mask: boolean
}

function Mask(props: Props) {
    const { mask } = props
    const _style = { opacity: mask ? 1 : 0 ,zIndex:mask?5:0}
    return (
        <div className="mask" style={_style} onClick={() => { props.setMask(false) }} >
        </div >
    )
}

// class Mask extends React.Component {
//     render() {
//         return (
//             <div className="mask" onClick={() => { console.log(1) }} >
//             </div >
//         )
//     }
// }

const mapStateToProps = (state: any) => {
    return {
        mask: state.other.mask
    }
}

export default connect(mapStateToProps, { setMask })(Mask)