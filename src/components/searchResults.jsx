import React from 'react';
import { connect } from 'react-redux';
import { markAddress } from '../actions/addressActions';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressId: '',
    };
  }
  markAddress(id) {
    this.props.markAddress(id);
  }
  render() {
    return (
      <div style={{ width: 400 }}>
        <button
          onClick={() => this.markAddress(this.props.address.id)}
          style={{ width: 295, backgroundColor: '#FFE4B5' }}
        >
          <div>
            {this.props.address.firstName}{' '}
            {this.props.address.lastName}{', '}
            {this.props.address.city}
            <br /><br />
          </div>
        </button>
        <br /><br />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    addressList: state.counter,
  };
}

export default connect(mapStateToProps, { markAddress })(SearchResults);
