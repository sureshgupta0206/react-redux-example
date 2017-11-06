import 'fixed-data-table-2/dist/fixed-data-table.css';
import React from 'react';
import SearchAddress from './searchAddress';
import AddressForm from './addressForm';

class StartBook extends React.Component {
  render() {
    return (
      <div style={{ backgroundColor: 'white' }}>
        <header style={{ textAlign: 'center' }}><h4><b><i>Address Book</i></b></h4></header>
        <div
          style={{
            display: 'inline-block',
            width: 300,
            height: 590,
            border: 'ridge',
            overflowY: 'scroll' }}
        >
          <SearchAddress />
        </div>
        <div style={{ display: 'inline-block', width: 600, height: 590 }} >
          <AddressForm />
        </div>
        <footer style={{ textAlign: 'center' }}><h4>
          <b><i>&copy;All Rights Reserved.</i></b>
        </h4></footer>
      </div>
    );
  }

}

export default StartBook;
