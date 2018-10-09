
import React, { Component } from 'react'
import { Icon, Popover, Button, Badge } from 'antd'



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
        const content = (
            <div>
            {this.props.notifications.data.length>0 ? this.props.notifications.data.map(item =><div key={item.id}>{item.msg}</div>) : <div>Пусто</div>}
            </div>
        );
        return(
            <Popover
                content={content}
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
                title={this.props.notifications.data.length > 0 ? 'Новые уведомления' : 'Новых уведомлений нет'}
            >
                <Badge count={this.state.count} className="badge-info">
                    <Icon type="message" theme="outlined" style={{ fontSize: 22, cursor :'pointer', marginLeft:15 }} />
                </Badge>
            </Popover>

        );
    }
}

export default Notificator;