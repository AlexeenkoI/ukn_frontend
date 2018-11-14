import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Card, Icon } from 'antd'
import  Preloader  from '../Preloader'
import { getSettings } from '../../actions/SettingsActions'
import { withRouter } from 'react-router'
import { Link, Redirect } from 'react-router-dom'

export class SettingsList extends Component {

  constructor(props){
    super(props)

  }

  componentWillMount(){
    const { loadSettings } = this.props;

  }

  render() {
    const { settings } = this.props;
    const { Meta } = Card;
    const keys = Object.keys(settings.data);
    return (
      <Row type="flex" justify="start" style={{flexWrap:"wrap"}}>
        {settings.loading ? <Preloader/> :
         keys.map( (setting, pos) =>
          <Card
            style={{ margin : "15px", width : "300px" }}
            className="settings-card"
            key={pos}
            actions={[<Link to={"/settings/"+ keys[pos] }><Icon type="setting" /></Link>]}
            hoverable={true}
          >
            <Meta
              style={{minHeight : "110px"}}
              title={settings.description[setting].name}
              description={settings.description[setting].description}          
            />
          </Card>
        )}
      </Row>
    )
  }
}

const mapStateToProps = (state) => ({
  user : state.user,
  settings : state.settings
})

const mapDispatchToProps = dispatch => ({
  loadSettings : (userId) => dispatch(getSettings(userId)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SettingsList))

