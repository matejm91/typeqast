import React from "react";
import {Col, Row, Icon, Divider} from "antd";
import '../../../assets/style/contactView.css';
import {withRouter} from'react-router';

class ContactView extends React.Component {
  render() {
    return (
        <Row type='flex' justify='center' className='typeqast-contactView__viewRow'>
          <Col span={4}>
            <img className='typeqast-contactView__img' src={this.props.contact.profile_img} />
          </Col>
          <Col span={13} className='typeqast-contactView__contactInfo'>
            <Row type='flex' justify='start' align='middle'>
              <Col span={1} offset={1}>
                <Icon className='typeqast-contactView__backArrow' type="arrow-left" onClick={this.handleBackClick} />
              </Col>
              <Col span={18} className='typeqast-contactView__name'>
                {this.props.contact.full_name}
              </Col>
              <Col span={1}>
                <Icon className='typeqast-contactView__favoriteIcon' type="heart" theme={this.props.contact.favorite ? 'filled' : 'outlined'} onClick={() => this.handleFavorite(this.props.contact.id)}/>
              </Col>
              <Col span={1} offset={1}>
                <Icon className='typeqast-contactView__editIcon' type="edit" onClick={() => this.handleEdit(this.props.contact.id)} />
              </Col>
            </Row>
            <Divider className='typeqast-contactView__headerDivider' />
            <Row className='typeqast-contactView__userContact' type='flex' justify='start'>
              <Col className='typeqast-contactView__label' xs={{offset: 2}} md={{offset: 3}}>
                <Icon className='typeqast-contactView__icon' type="mail" /> email
              </Col>
              <Col offset={1} className='typeqast-contactView__infoText'>
                {this.props.contact.email}
              </Col>
            </Row>
            <Row type='flex' justify='start' className='typeqast-contactView__userContact'>
              <Col className='typeqast-contactView__label' xs={{offset: 2}} md={{offset: 3}}>
                <Icon className='typeqast-contactView__icon' type="phone" /> numbers
              </Col>
              <Col offset={1}>
                {this.props.contact.contact_numbers.map((contact_number, index) => (
                  <Row key={index} type='flex' justify='space-between' className='typeqast-contactView__infoText typeqast-contactView__infoTextRow'>
                    <Col className='typeqast-contactView__numberPlaceholder'>
                      {Object.keys(contact_number)[0].toUpperCase()}
                    </Col>
                    <Col className='typeqast-contactView__number'>
                      {Object.values(contact_number)[0]}
                    </Col>
                  </Row>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
    );
  }

  handleBackClick = () => {
    this.props.history.goBack();
  }

  handleFavorite = (id) => {
    this.props.onFavorite(id);
  }

  handleEdit = (id) => {
    this.props.history.push(`/edit/${id}`);
  }
}

export default withRouter(ContactView);