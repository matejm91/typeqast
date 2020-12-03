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
        <Col key={this.props.contact.id} xs={24} md={6}>
          <div className="typeqast-contactList__contactItem">
            <Row type="flex" className="typeqast-contactList__actionsRow">
              <Col xs={{ span: 3, push: 11}} md={{ span: 3}}>
                <Icon
                  className="typeqast-contactList__favoriteIcon"
                  type="heart"
                  theme={this.props.contact.favorite ? 'filled' : 'outlined'}
                  onClick={() => this.props.onFavorite(this.props.contact.id)}
                />
              </Col>
              <Col xs={{ span: 3, push: 15}} md={{ span: 3, offset: 15 }}>
                <Icon
                  className={
                    this.props.favorites
                      ? 'typeqast-contactList__editIcon-favoritesView'
                      : 'typeqast-contactList__editIcon'
                  }
                  type="edit"
                  onClick={() => this.props.onEdit(this.props.contact.id)}
                />
              </Col>
              <Col xs={{ span: 3, push: 15}} md={{ span: 3}}>
                <Icon
                  className={
                    this.props.favorites
                      ? 'typeqast-contactList__deleteIcon-favoritesView'
                      : 'typeqast-contactList__deleteIcon'
                  }
                  type="delete"
                  onClick={() => this.props.onToggleDelete(this.props.contact.id)}
                />
              </Col>
            </Row>
            <Row
              justify="center"
              align="middle"
              onClick={() => this.props.onContactClick(this.props.contact.id)}
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
}

export default ContactItem;
