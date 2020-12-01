import React from "react";
import {Icon, Input} from 'antd';

class ContactListFilter extends React.Component {
  render() {
    return (
      <Input type='text' prefix={<Icon type="search" />} onChange={this.handleFilterChange} />
    )
  }

  handleFilterChange = (e) => {
    this.props.onFilterChange(e.target.value);
  }
}

export default ContactListFilter;