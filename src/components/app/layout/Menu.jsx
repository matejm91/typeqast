import React from "react";
import {Divider, Row, Typography} from "antd";
import '../../../assets/style/menu.css';
import {withRouter} from 'react-router';

class Menu extends React.Component {
  render() {
    return (
      <Row className='typeqast-menu__menuRow' type='flex' justify='center' align='middle'>
        <a className={`typeqast-menu__navigationItem ${this.props.history.location.pathname === '/contacts' && 'active'}`}><Typography.Title level={3} onClick={this.handleAllContactsClick}>All contacts</Typography.Title></a>
        <Divider type='vertical' />
        <a className={`typeqast-menu__navigationItem ${this.props.history.location.pathname === '/favorites' && 'active'}`}><Typography.Title level={3} onClick={this.handleFavoritesClick}>My favorites</Typography.Title></a>
      </Row>
    );
  }

  handleAllContactsClick = () => {
    this.props.history.push('/contacts')
  }

  handleFavoritesClick = () => {
    this.props.history.push('/favorites')
  }
}

export default withRouter(Menu);