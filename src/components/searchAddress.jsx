import React from 'react';
import { connect } from 'react-redux';
import SearchResults from './searchResults';

class SearchAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      id: '',
    };
  }
  render() {
    const filteredAddreses = this.props.addressList.customerAddress.filter(
            (address) => {
              const fullName = address.firstName.toString().toLowerCase()
              + address.lastName.toString().toLowerCase();
              return fullName.indexOf(this.state.searchText.toLowerCase()) !== -1;
            }
        );
    return (
      <div>
        <table>
          <thead><tr><th>
            <input
              style={{ width: 295 }}
              className="form-control"
              placeholder="Search by first name or last name..."
              onChange={event => this.setState({ searchText: event.target.value })}
            />
            <br />
          </th></tr></thead>
          <tbody>
            <tr>
              <td>{filteredAddreses.map(
                (address) => <SearchResults key={address.id} address={address} />)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    addressList: state.counter,
  };
}
export default connect(mapStateToProps, {})(SearchAddress);
