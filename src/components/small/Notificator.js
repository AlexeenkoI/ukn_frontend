
import React, { Component } from 'react'
import { Icon, Popover, Badge } from 'antd'



class Notificator extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            count : this.props.notifications.data.length
        }

        this.handleVisibleChange = this.handleVisibleChange.bind(this);
    }

    componentWillMount(){
        
    }

    handleVisibleChange = () => {
        this.setState({
            visible : !this.state.visible,
            count : 0
        })
    }

    render(){
        const { notifications } = this.props;
        const content = (
            <div>
            {notifications.data.length > 0 ? 
                notifications.data.map(item =><div key={item.id}>{item.msg}</div>) 
                : <div>Уведомлений нет</div>}
            </div>
        );
        return(
            <Popover
                content={content}
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
                title={notifications.data.length > 0 ? 'Новые уведомления' : 'Новых уведомлений нет'}
            >
                <Badge count={this.state.count} className="badge-info">
                    <Icon type="message" theme="outlined" style={{ fontSize: 22, cursor :'pointer', marginLeft:15 }} />
                </Badge>
            </Popover>

        );
    }
}

export default Notificator;