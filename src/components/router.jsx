import {BrowserRouter as Router, BrowserRouter, Redirect, Route} from "react-router-dom";
import ContactListContainer from "./contacts/list/ContactListContainer";
import ContactViewContainer from "./contacts/view/ContactViewContainer";
import ContactCreateContainer from "./contacts/create/ContactCreateContainer";
import ContactFavoritesListContainer from "./contacts/list/ContactFavoritesListContainer";
import ContactUpdateContainer from "./contacts/update/ContactUpdateContainer";

const router = (
  <BrowserRouter>
    <Router>
      <Route exact path='/'>
        <Redirect to='/contacts' />
      </Route>
      <Route path='/contacts' component={ContactListContainer} />
      <Route path='/contact/:contactId' component={ContactViewContainer} />
      <Route path='/create' component={ContactCreateContainer} />
      <Route path='/favorites' component={ContactFavoritesListContainer} />
      <Route path='/edit/:contactId' component={ContactUpdateContainer} />
    </Router>
  </BrowserRouter>
)

export default router;