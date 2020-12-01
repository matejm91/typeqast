import React from "react";
import ContactForm from "../form/ContactForm";
import {dummyContactData} from "../../../dummyData";
import {withRouter} from 'react-router';

class ContactCreateContainer extends React.Component {
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
    if (this.state.contacts !== prevState.contacts) {
      if (this.state.contacts.length - prevState.contacts.length === 1) {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
        this.props.history.push('/contacts');
      } else {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      }
    }
  }

  render() {
    return (
      <ContactForm
        onSubmit={this.handleCreate}
      />
    );
  }

  handleCreate = (data) => {
    const contactList = [...this.state.contacts];
    data.id = contactList[contactList.length - 1].id++;
    contactList.push(data);

    this.setState({
      contacts: contactList,
    });
  }
}

export default withRouter(ContactCreateContainer);