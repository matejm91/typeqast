import React from "react";
import {Button, Col, Divider, Form, Icon, Input, Row, Upload} from "antd";
import '../../../assets/style/contactForm.css';
import '../../../assets/style/contactView.css';
import '../../../App.css';
import {withRouter} from 'react-router';

class ContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    }
  }

  render() {
    const {getFieldDecorator, getFieldValue} = this.props.form;

    getFieldDecorator('contact_numbers', { initialValue: this.props.contact && this.props.contact.contact_numbers });

    const numbers = getFieldValue('contact_numbers');

    const formItems = numbers.map((k, index) => (
      <Row type="flex" justify="space-around" align='bottom' key={index}>
        <Col xs={24} md={12}>
          <Form.Item
            className='typeqast-contactForm__formItem-numbers'
            label={
              index === 0 && <React.Fragment>
              <Icon className='typeqast-contactForm__icon' type="phone" /> numbers
              </React.Fragment>
            }>
            {getFieldDecorator(`number[${index}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              initialValue: k && Object.values(k)[0],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please input passenger's name or delete this field.",
                },
              ],
            })(<Input placeholder="Number" className='typeqast-contactForm__inputField-numbers'/>)}
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item key={k}>
            {getFieldDecorator(`contact[${index}]`, {
              validateTrigger: ['onChange', 'onBlur'],
              initialValue: Object.keys(k).length ? Object.keys(k)[0].charAt(0).toUpperCase() + Object.keys(k)[0].slice(1) : '',
              rules: [
                {
                  whitespace: true,
                  message: "Please input passenger's name or delete this field.",
                },
              ],
            })(<Input placeholder="Cell" className='typeqast-contactForm__inputField-numbers'/>)}
            {numbers.length > 1 ? (
              <Icon type="close-circle" className="typeqast-contactForm__removeNumber" onClick={() => this.removeNumber(k)} />
            ) : null}
          </Form.Item>
        </Col>
      </Row>
    ));

    const Buttons = (
      <Row type='flex' justify='space-between' className="typeqast-contactForm__buttons">
        <Button className='typeqast-contactForm__cancelButton' onClick={this.handleCancel}>Cancel</Button>
        <Button className='typeqast-contactForm__submitButton' htmlType="submit">Save</Button>
      </Row>
    );

    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit} className='typeqast-contactForm__form'>
          <Row type='flex' justify='center'>
            <Col span={4} className='typeqast-contactForm__contactImg'>
              <Form.Item>
                {getFieldDecorator('profile_img', {
                  valuePropName: 'fileList',
                })
                (<Upload.Dragger className='typeqast-contactForm__uploadDragger'>
                  {
                    this.props.contact && this.props.contact.profile_img ?
                    <img src={this.props.contact.profile_img} alt="avatar" style={{ width: '100%' }} /> :
                    <Icon type="upload" />
                  }
                </Upload.Dragger>)}
              </Form.Item>
            </Col>
            <Col span={13} className='typeqast-contactForm__contactInfo'>
              <Row type='flex' justify='space-between'>
                <Col>
                  <Icon className='typeqast-contactForm__backIcon' type="arrow-left" onClick={this.handleBackClick} />
                </Col>
                {this.props.onDelete && <Col>
                  <Row type='flex' justify='space-between' onClick={this.toggleDeleteModal}>
                    <Col>
                      <p className='typeqast-contactForm__deleteButtonLabel'>Delete</p>
                    </Col>
                    <Col>
                      <Icon className='typeqast-contactForm__deleteIcon' type="delete"/>
                    </Col>
                  </Row>
                </Col>}
              </Row>
              <Divider className='typeqast-contactForm__sectionDivider' />
              <Form.Item
                className='typeqast-contactForm__formItem'
                label={
                  <React.Fragment>
                    <Icon className='typeqast-contactForm__icon' type="user" /> full name
                  </React.Fragment>
                }>
                {getFieldDecorator('full_name', {
                  rules: [{required: true, message: 'Please input your full name', whitespace: true}],
                  initialValue: this.props.contact && this.props.contact.full_name
                })(<Input className='typeqast-contactForm__inputField' placeholder="Full name"/>)}
              </Form.Item>
              <Divider className='typeqast-contactForm__sectionDivider' />
              <Form.Item
                className='typeqast-contactForm__formItem'
                label={
                  <React.Fragment>
                    <Icon className='typeqast-contactForm__icon' type="mail" /> email
                  </React.Fragment>
                }>
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    }
                  ],
                  initialValue: this.props.contact && this.props.contact.email
                })(<Input className='typeqast-contactForm__inputField' placeholder="Email"/>)}
              </Form.Item>
              <Divider className='typeqast-contactForm__sectionDivider' />
              {formItems}
              <Form.Item>
                <Button className="typeqast-contactForm__addField" onClick={() => this.addNumber(numbers.length)}>
                  <Icon type="plus-circle" /> Add field
                </Button>
              </Form.Item>
              {Buttons}
            </Col>
          </Row>
        </Form>
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
    );
  }

  addNumber = () => {
    const { form } = this.props;
    const numbers = form.getFieldValue('contact_numbers');
    numbers.push({"": ""})
    form.setFieldsValue({
      contact_numbers: numbers,
    });
  };

  removeNumber = (k) => {
    const { form } = this.props;
    const numbers = form.getFieldValue('contact_numbers');

    if (numbers.length === 1) {
      return;
    }

    numbers.splice(numbers.indexOf(k), 1)

    form.setFieldsValue({
      contact_numbers: numbers,
    });
  };

  handleBackClick = () => {
    this.props.history.goBack();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      values.contact_numbers.map((contact_number, index) => {
        if (Object.keys(contact_number)[0] === '') {
          values.contact_numbers[index] = {
            [values.contact[index]]: values.number[index]
          };
        }
      });

      this.props.form.setFieldsValue({
        contact_numbers: values.contact_numbers,
      });

      delete values.number;
      delete values.contact;
      const data = {
        ...values,
        id: this.props.contact && this.props.contact.id,
        profile_img: this.props.contact && this.props.contact.profile_img,
      }
      this.props.onSubmit(data);
      this.props.form.resetFields();
    });
  }

  toggleDeleteModal = () => {
    this.setState({
      visible: !this.state.visible,
    });
  }

  handleDelete = () => {
    this.props.onDelete(this.props.contact.id);
  }

  handleCancel = () => {
    this.props.form.resetFields();
    this.props.history.push('/');
  }
}

const WrappedContactForm = Form.create({name: 'contact'})(ContactForm)

export default withRouter(WrappedContactForm);