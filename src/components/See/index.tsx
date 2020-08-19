import React from 'react'
import { setMask } from '../../store/action'
import { connect } from 'react-redux'
interface Props {
    op?: boolean
    setMask: Function
}
interface State {

}
class See extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)

    }

    handleSwitch = () => {
        this.props.setMask(false)
    }


    render() {
        const { op } = this.props
        const _bottom = { bottom: op ? '0' : '-8rem' }
        const _isShow = { display: op ? 'block' : 'none' }
        return (

            <ul className="see-opertion" style={_bottom}>
                <li>查看收藏</li>
                <li>查看GitHub</li>
            </ul>


        )
    }
}


export default connect(null, { setMask })(See)