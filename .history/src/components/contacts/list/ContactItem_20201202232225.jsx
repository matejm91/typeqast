import React from 'react';
import {Col, Row, Icon} from 'antd';

class ContactItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      id: null,
    };
  }

  render() {
    return (
      <React.Fragment>
        <Col xs={24} md={6}>
          <div className="typeqast-contactList__contactItem">
            <Row type="flex" justify="space-around" className="typeqast-contactList__actionsRow">
              <Col xs={{ span: 8}} md={{ span: 3}}>
                <Icon
                  className="typeqast-contactList__favoriteIcon"
                  type="heart"
                  theme={this.props.contact.favorite ? 'filled' : 'outlined'}
                  onClick={(e) => this.handleFavorite(e, this.props.contact.id)}
                />
              </Col>
              <Col xs={{ span: 8}} md={{ span: 3, offset: 15 }}>
                <Icon
                  className={
                    this.props.favorites
                      ? 'typeqast-contactList__editIcon-favoritesView'
                      : 'typeqast-contactList__editIcon'
                  }
                  type="edit"
                  onClick={(e) => this.handleEdit(e, this.props.contact.id)}
                />
              </Col>
              <Col xs={{ span: 8}} md={{ span: 3}}>
                <Icon
                  className={
                    this.props.favorites
                      ? 'typeqast-contactList__deleteIcon-favoritesView'
                      : 'typeqast-contactList__deleteIcon'
                  }
                  type="delete"
                  onClick={(e) => this.handleToggleDelete(e, this.props.contact.id)}
                />
              </Col>
            </Row>
            <Row
              className="typeqast-contactItem__imageNameRow"
              justify="center"
              align="middle"
              onClick={(e) => this.handleContactClick(e, this.props.contact.id)}
            >
              <img
                className="typeqast-contactList__profileImg"
                src={this.props.contact.profile_img}
              />
              <div className="typeqast-contactList__contactName">
                {this.props.contact.full_name}
              </div>
            </Row>
          </div>
        </Col>
      </React.Fragment>
    );
  }

  handleFavorite = (e, id) => {
    e.preventDefault();
    this.props.onFavorite(id);
  }

  handleEdit = (e, id) => {
    e.preventDefault();
    this.props.onEdit(id);
  }

  handleToggleDelete = (e, id) => {
    e.preventDefault();
    this.props.onToggleDelete(id);
  }

  handleContactClick = (e, id) => {
    e.preventDefault();
    this.props.onContactClick(id);
  }

}

export default ContactItem;
