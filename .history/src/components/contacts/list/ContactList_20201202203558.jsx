import React from 'react';
import {Col, Icon, Modal, Row, Button} from 'antd';
import {withRouter} from 'react-router';
import '../../../assets/style/contactList.css';
import '../../../assets/style/contactForm.css';

class ContactList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      id: null,
    }
  }

  render() {
    return (
      <React.Fragment>
        {!this.props.favorites && <Col xs={24} md={6} onClick={this.handleAddNewContactClick}>
          <div className='typeqast-contactList__addNewInnerDiv'>
            +<br/>
            Add new
          </div>
        </Col>}
        {this.props.contacts && this.props.contacts.map(contact => (
          <Col key={contact.id} xs={24} md={6}>
            <div className='typeqast-contactList__contactItem'>
              <Row type='flex' className='typeqast-contactList__actionsRow'>
                <Col span={3}>
                  <Icon className='typeqast-contactList__favoriteIcon' type="heart" theme={contact.favorite ? 'filled' : 'outlined'} onClick={() => this.handleFavorite(contact.id)}/>
                </Col>
                <Col span={3} offset={15}>
                  <Icon className={this.props.favorites ? 'typeqast-contactList__editIcon-favoritesView' : 'typeqast-contactList__editIcon'} type="edit" onClick={() => this.handleEdit(contact.id)} />
                </Col>
                <Col span={3}>
                  <Icon className={this.props.favorites ? 'typeqast-contactList__deleteIcon-favoritesView' : 'typeqast-contactList__deleteIcon'} type="delete" onClick={() => this.toggleDeleteModal(contact.id)} />
                </Col>
              </Row>
              <Row justify='center' align='middle' onClick={() => this.handleContactClick(contact.id)}>
                <img className='typeqast-contactList__profileImg' src={contact.profile_img} />
                <div className='typeqast-contactList__contactName'>
                  {contact.full_name}
                </div>
              </Row>
            </div>
          </Col>
        ))}
        {this.state.visible && (<Modal
          title='Delete'
          onCancel={this.toggleDeleteModal}
          visible={true}
          maskClosable={false}
          footer={[
            <Row type='flex' justify='space-between'>
              <Button className='typeqast-contactForm__cancelButton' key="cancel" onClick={this.toggleDeleteModal}>
                Cancel
              </Button>
              <Button className='typeqast-contactForm__submitButton' key="submit" type="primary" onClick={this.handleDelete}>
                Delete
              </Button>
            </Row>
          ]}
        >
          Are you sure you want to delete this contact?
        </Modal>)}
      </React.Fragment>
    )
  }

  toggleDeleteModal = (id) => {
    this.setState({
      visible: !this.state.visible,
      id,
    });
  }

  handleContactClick = (id) => {
    this.props.history.push(`/contact/${id}`);
  }

  handleAddNewContactClick = () => {
    this.props.history.push('/create');
  }

  handleEdit = (id) => {
    this.props.history.push(`/edit/${id}`);
  }

  handleFavorite = (id) => {
    this.props.onFavorite(id);
  }

  handleDelete = () => {
    this.props.onDelete(this.state.id);

    this.setState({
      visible: !this.state.visible,
      id: null,
    });
  }
}

export default withRouter(ContactList);