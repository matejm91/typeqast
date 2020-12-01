import React from "react";
import ContactForm from "../form/ContactForm";
import {dummyContactData} from "../../../dummyData";
import {withRouter} from 'react-router';

class ContactUpdateContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: '',
    }
  }

  componentDidMount() {
    if (localStorage.getItem('contacts')) {
      const contacts = JSON.parse(localStorage.getItem('contacts'));
      this.setState({
        contacts,
      });
    } else {
      localStorage.setItem('contacts', JSON.stringify(dummyContactData));
      const contacts = JSON.parse(localStorage.getItem('contacts'));
      this.setState({
        contacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.contacts !== prevState.contacts && prevState.contacts !== '') {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      this.props.history.push('/contacts');
    }
  }

  render() {
    const contactToUpdate = this.state.contacts && this.state.contacts.filter(contact => JSON.stringify(contact.id) === this.props.match.params.contactId)[0];
    return (
      <React.Fragment>
        {contactToUpdate &&
          <ContactForm
            onSubmit={this.handleUpdate}
            contact={contactToUpdate}
            onDelete={this.handleDelete}
          />
        }
      </React.Fragment>
    );
  }

  handleUpdate = (data) => {
    const contactList = [...this.state.contacts];
    const elementToUpdate = this.state.contacts.findIndex(contact => contact.id === data.id);
    contactList.splice(elementToUpdate, 1, data);

    this.setState({
      contacts: contactList,
    });
  }

  handleDelete = (id) => {
    const contactList = [...this.state.contacts];
    const elementToDelete = this.state.contacts.findIndex(contact => contact.id === id);
    contactList.splice(elementToDelete, 1);

    this.setState({
      contacts: contactList,
    });
  }
}

export default withRouter(ContactUpdateContainer);