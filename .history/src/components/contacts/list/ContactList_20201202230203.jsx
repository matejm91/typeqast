import React from 'react';
import {Col, Modal, Row, Button} from 'antd';
import {withRouter} from 'react-router';
import ContactItem from './ContactItem.jsx';
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
          <ContactItem
            key={contact.id}
            contact={contact}
            favorites={this.props.favorites}
            onToggleDelete={this.toggleDeleteModal}
            onContactClick={this.handleContactClick}
            onEdit={this.handleEdit}
            onFavorite={this.handleFavorite}
          />
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