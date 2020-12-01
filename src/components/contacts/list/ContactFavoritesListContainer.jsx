import React from "react";
import ContactList from "./ContactList";
import {dummyContactData} from "../../../dummyData";
import {Col, Divider, Row} from "antd";
import Menu from "../../app/layout/Menu";
import ContactListFilter from "./ContactListFilter";

class ContactFavoritesListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: '',
    }
  }

  componentDidMount() {
    if (localStorage.getItem('contacts')) {
      this.setState({
        contacts: JSON.parse(localStorage.getItem('contacts')),
      });
    } else {
      localStorage.setItem('contacts', JSON.stringify(dummyContactData));
      this.setState({
        contacts: JSON.parse(localStorage.getItem('contacts'))
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const favoriteContacts = this.state.contacts && this.state.contacts.filter(contact => contact.favorite);
    return (
      <React.Fragment>
        <Row>
          <Menu />
          <Divider className='typeqast-app__headerDivider' />
        </Row>
        <Row className='typeqast-contactList__filterRow' type='flex' justify='center'>
          <Col>
            <ContactListFilter onFilterChange={this.handleFilterChange}/>
          </Col>
        </Row>
        <Row className='typeqast-contactList__list' gutter={16} type="flex">
          {favoriteContacts && <ContactList contacts={favoriteContacts || []} favorites={true} onDelete={this.handleDelete} onFavorite={this.handleFavorite}/>}
        </Row>
      </React.Fragment>
    )
  }

  handleFilterChange = (filterValue) => {
    const contactList = [...this.state.contacts];
    const filteredContactList = contactList.filter(contact => contact.full_name.toLowerCase().startsWith(filterValue) || contact.full_name.split(' ')[1].toLowerCase().startsWith(filterValue));

    if (filterValue === '') {
      localStorage.setItem('contacts', JSON.stringify(dummyContactData));
      this.setState({
        contacts: JSON.parse(localStorage.getItem('contacts'))
      });
    } else {
      this.setState({
        contacts: filteredContactList,
      });
    }
  }

  handleFavorite = (id) => {
    const contactList = [...this.state.contacts];
    this.state.contacts.filter(contact => {
      if (contact.id === id) {
        contact.favorite = !contact.favorite;
      }
    });

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

export default ContactFavoritesListContainer;