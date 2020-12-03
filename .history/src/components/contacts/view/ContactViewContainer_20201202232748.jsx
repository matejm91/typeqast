import React from "react";
import ContactView from "./ContactView.jsx";
import {dummyContactData} from "../../../dummyData";

class ContactViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: '',
      allContacts: '',
    }
  }

  componentDidMount() {
    if (localStorage.getItem('contacts')) {
      const allContacts = JSON.parse(localStorage.getItem('contacts'));
      const contact = allContacts.filter(contact => JSON.stringify(contact.id) === this.props.match.params.contactId)[0];
      this.setState({
        contact,
        allContacts: allContacts,
      });
    } else {
      localStorage.setItem('contacts', JSON.stringify(dummyContactData));
      const allContacts = JSON.parse(localStorage.getItem('contacts'));
      const contact = allContacts.filter(contact => JSON.stringify(contact.id) === this.props.match.params.contactId)[0];
      this.setState({
        contact,
        allContacts: allContacts,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.contact && <ContactView contact={this.state.contact} onFavorite={this.handleFavorite}/>}
      </React.Fragment>
    );
  }

  handleFavorite = (id) => {
    const contactList = [...this.state.allContacts];
    this.state.allContacts.filter(contact => {
      if (contact.id === id) {
        contact.favorite = !contact.favorite;
      }
    });

    this.setState({
      allContacts: contactList,
    });
  }
}

export default ContactViewContainer;