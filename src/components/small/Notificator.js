
import React, { Component } from 'react'
import { Icon, Popover, Badge } from 'antd'
import { Link} from 'react-router-dom'



class Notificator extends Component{
  constructor(props){
    super(props);
    console.log('nofigicator');
    console.log(this.props.notifications);
    this.state = {
        visible: false,
    }
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
  }

  handleVisibleChange = () => {
      this.setState({
          visible : !this.state.visible,
      })
      this.props.viewHandler();
  }

  render(){
      const { notifications } = this.props;
      const content = (
        <div>
        {notifications.data.length > 0 ? 
          notifications.data.map(item =><Link to={`/contracts/edit/${item.id}`} key={item.id}><div >{item.message}</div></Link>) 
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
          <Badge count={this.props.notifications.count} className="badge-info">
            <Icon type="message" theme="outlined" style={{ fontSize: 22, cursor :'pointer', marginLeft:15 }} />
          </Badge>
        </Popover>
      );
  }
}

export default Notificator;