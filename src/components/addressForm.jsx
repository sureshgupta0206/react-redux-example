import { connect } from 'react-redux';
import { Table, Column, Cell } from 'fixed-data-table-2';
import React from 'react';
import {
FormGroup,
FormControl,
InputGroup,
ControlLabel,
Button,
Glyphicon,
Modal } from 'react-bootstrap';
import { addAddress, saveAddress, deleteAddress } from '../actions/addressActions';

class AddressForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      customer: {
        id: '',
        firstName: '',
        lastName: '',
        address: '',
        postalcode: '',
        city: '',
        country: '',
        phoneNumber: '',
      },
      showModal: false,
      saveClicked: false,
      addClicked: false,
      deleteClicked: false,
      showModalDelete: false,
    };
  }
  addAddress() {
    this.props.addAddress(this.state.customer);
    this.setState({ showModal: true });
    this.setState({ addClicked: true });
  }
  saveAddress() {
    this.props.saveAddress(this.props.addressList.addressToModify.id, this.state.customer);
    this.setState({ showModal: true });
    this.setState({ saveClicked: true });
  }
  deleteAddress() {
    this.setState({ showModalDelete: true });
  }
  confirmDelete() {
    this.setState({ deleteClicked: true });
    this.props.deleteAddress(this.props.addressList.addressToModify.id);
    this.reset();
    this.setState({ showModalDelete: false });
  }
  updateState() {
    this.setState({
      customer: {
        firstName: this.props.addressList.addressToModify.firstName,
        lastName: this.props.addressList.addressToModify.lastName,
        address: this.props.addressList.addressToModify.address,
        postalcode: this.props.addressList.addressToModify.postalcode,
        city: this.props.addressList.addressToModify.city,
        country: this.props.addressList.addressToModify.country,
        phoneNumber: this.props.addressList.addressToModify.phoneNumber,
      },
    });
    this.props.addressList.editClicked = true;
  }
  reset() {
    this.setState({
      customer: {
        firstName: '',
        lastName: '',
        address: '',
        postalcode: '',
        city: '',
        country: '',
        phoneNumber: '',
      },
    });
    this.props.addressList.addressToModify = '';
  }

  close() {
    this.setState({ showModal: false });
    this.setState({ showModalDelete: false });
    this.setState({ addClicked: false });
    this.setState({ saveClicked: false });
    this.setState({ deleteClicked: false });
  }

  render() {
    let addOrModifyForm = null;
    let showSelection = null;
    let addPopup = null;
    let savePopup = null;
    if (this.state.addClicked === true) {
      addPopup = <div>Address added successfully.</div>;
    }
    if (this.state.saveClicked === true) {
      savePopup = <div>Address saved successfully.</div>;
    }
    const { firstName,
            lastName,
            address,
            postalcode,
            city,
            country,
            phoneNumber } = this.state.customer;
    const isEnabled =
      firstName.toString().length > 0
      && lastName.toString().length > 0
      && address.toString().length > 0
      && postalcode.toString().length > 0
      && city.toString().length > 0
      && country.toString().length > 0
      && phoneNumber.toString().length > 0;
    if ((this.props.addressList.addressToModify === '')
      || (this.props.addressList.editClicked === true)) {
      addOrModifyForm = (
        <form style={{ marginTop: '-60px', marginBottom: '50px' }}>
          <FormGroup controlId="firstNameText" >
            <ControlLabel>First Name *</ControlLabel>
            <FormControl
              type="text"
              value={this.state.customer.firstName}
              placeholder="Enter First Name"
              onChange={event => this.setState({
                customer: {
                  ...this.state.customer,
                  firstName: event.target.value,
                },
              })
            } required
            />
          </FormGroup>
          <FormGroup controlId="lastNameText">
            <ControlLabel>Last Name *</ControlLabel>
            <FormControl
              type="text"
              value={this.state.customer.lastName}
              placeholder="Enter Last Name"
              onChange={event => this.setState({
                customer: {
                  ...this.state.customer,
                  lastName: event.target.value,
                },
              })} required
            />
          </FormGroup>
          <FormGroup controlId="address">
            <ControlLabel>Address *</ControlLabel>
            <FormControl
              type="text"
              value={this.state.customer.address}
              placeholder="Enter Address"
              onChange={event => this.setState({
                customer: {
                  ...this.state.customer,
                  address: event.target.value,
                },
              })} required
            />
          </FormGroup>
          <FormGroup controlId="postalcode">
            <ControlLabel>Postal Code *</ControlLabel>
            <FormControl
              type="number"
              onChange={event => this.setState({
                customer: {
                  ...this.state.customer,
                  postalcode: event.target.value,
                },
              })}
              value={this.state.customer.postalcode}
              placeholder="Enter Postal Code"
              required
            />
          </FormGroup>
          <FormGroup controlId="city">
            <ControlLabel>City *</ControlLabel>
            <FormControl
              type="text"
              value={this.state.customer.city}
              placeholder="Enter City"
              onChange={event => this.setState({
                customer: {
                  ...this.state.customer,
                  city: event.target.value,
                },
              })} required
            />
          </FormGroup>
          <FormGroup controlId="country">
            <ControlLabel>Country *</ControlLabel>
            <FormControl
              type="text"
              value={this.state.customer.country}
              placeholder="Enter Country"
              onChange={event => this.setState({
                customer: {
                  ...this.state.customer,
                  country: event.target.value,
                },
              })} required
            />
          </FormGroup>
          <FormGroup controlId="phoneNumber">
            <ControlLabel>Phone Number *</ControlLabel>
            <FormControl
              type="number"
              onChange={event => this.setState({
                customer: {
                  ...this.state.customer,
                  phoneNumber: event.target.value,
                },
              })}
              value={this.state.customer.phoneNumber}
              placeholder="Enter Phone Number"
              required
            />
          </FormGroup>
        </form>);
    } else {
      showSelection =
       (<form style={{ marginTop: '-60px' }}>
         <FormGroup controlId="firstNameText">
           <ControlLabel>First Name *</ControlLabel>
           <FormControl
             type="text"
             defaultValue={this.props.addressList.addressToModify.firstName}
             readOnly="readOnly"
           />
         </FormGroup>
         <FormGroup controlId="lastNameText">
           <ControlLabel>Last Name *</ControlLabel>
           <FormControl
             type="text"
             defaultValue={this.props.addressList.addressToModify.lastName}
             readOnly="readOnly"
           />
         </FormGroup>
         <FormGroup controlId="address">
           <ControlLabel>Address *</ControlLabel>
           <FormControl
             type="text"
             defaultValue={this.props.addressList.addressToModify.address}
             readOnly="readOnly"
           />
         </FormGroup>
         <FormGroup controlId="postalcode">
           <ControlLabel>Postal Code *</ControlLabel>
           <FormControl
             type="text"
             defaultValue={this.props.addressList.addressToModify.postalcode}
             readOnly="readOnly"
           />
         </FormGroup>
         <FormGroup controlId="city">
           <ControlLabel>City *</ControlLabel>
           <FormControl
             type="text"
             defaultValue={this.props.addressList.addressToModify.city}
             readOnly="readOnly"
           />
         </FormGroup>
         <FormGroup controlId="country">
           <ControlLabel>Country *</ControlLabel>
           <FormControl
             type="text"
             defaultValue={this.props.addressList.addressToModify.country}
             readOnly="readOnly"
           />
         </FormGroup>
         <FormGroup controlId="phoneNumber">
           <ControlLabel>Phone Number *</ControlLabel>
           <FormControl
             type="text"
             defaultValue={this.props.addressList.addressToModify.phoneNumber}
             readOnly="readOnly"
           />
         </FormGroup></form>);
    }
    return (
      <div>
        <Table
          rowHeight={650}
          rowsCount={1}
          width={600}
          height={590}
          headerHeight={50}
        >
          <Column
            header={<Cell>{<FormGroup>
              <InputGroup>
                <ControlLabel>Address Form </ControlLabel>
                <InputGroup.Addon bsSize="small" onClick={() => this.reset()}>
                  <Glyphicon glyph="plus" />
                </InputGroup.Addon>
              </InputGroup>
            </FormGroup>}</Cell>}
            cell={<Cell>{addOrModifyForm}
              {showSelection}
              <div style={{ textAlign: 'center' }}>
                {this.props.addressList.addressToModify === '' ?
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => this.addAddress()} disabled={!isEnabled}
                  >
                    Add
                  </button> : null}
                {showSelection !== null ?
                  <div>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => this.updateState()}
                    >
                      Edit
                    </button>
                    <div style={{ display: 'inline-block', width: '10px' }} />
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => this.deleteAddress()}
                    >
                      Delete
                    </button>
                  </div> : null}
                {showSelection === null && this.props.addressList.addressToModify !== '' ?
                  <div>
                    <button
                      type="button"
                      className="btn btn-success"
                      disabled={!isEnabled}
                      onClick={() => this.saveAddress()}
                    >
                      Save
                    </button>
                    <div style={{ display: 'inline-block', width: '10px' }} />
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => this.deleteAddress()}
                    >
                      Delete
                    </button>
                  </div> : null}</div></Cell>}
            width={600}
          />
        </Table>

        <Modal show={this.state.showModal} onHide={() => this.close()}>
          <Modal.Header closeButton>
            <Modal.Title />
          </Modal.Header>
          <Modal.Body>
            {addPopup}
            {savePopup}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.close()}>Ok</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showModalDelete} onHide={() => this.close()}>
          <Modal.Body>
            Do you want to delete address ?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.confirmDelete()}>Yes</Button>
            <Button onClick={() => this.close()}>No</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    addressList: state.counter,
  };
}
export default connect(mapStateToProps, { addAddress, saveAddress, deleteAddress })(AddressForm);
