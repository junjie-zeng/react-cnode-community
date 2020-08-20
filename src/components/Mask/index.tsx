import React from 'react'
import { setAssist } from '../../store/action'
import { connect } from 'react-redux'
import { MASK, PANEL} from './../../store/action-type'
interface Props {
    setAssist: Function
    mask: boolean
}

function Mask(props: Props) {
    const { mask } = props
    const _style = { opacity: mask ? 1 : 0 ,zIndex:mask?5:-5}

    const _setAssist = ()=>{
        props.setAssist(MASK,false)
        props.setAssist(PANEL,false)
    }

    return (
        <div className="mask" style={_style} onClick={_setAssist} ></div >
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
        mask: state.assist.mask
    }
}

export default connect(mapStateToProps, { setAssist })(Mask)