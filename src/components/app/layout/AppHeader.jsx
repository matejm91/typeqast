import React from "react";
import {Row} from "antd";
import Menu from './Menu';
import '../../../assets/style/appHeader.css';
import logo from '../../../assets/images/white_logo_transparent.png'

class AppHeader extends React.Component {
  render() {
    return (
      <div className='typeqast-appLayout__headerContent'>
        <Row className='typeqast-appLayout__headerTitle'>
          <img className='typeqast-appLayout__headerImage' src={logo}/>
        </Row>
      </div>
    );
  }
}

export default AppHeader;