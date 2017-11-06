import {
  ADD_ADDRESS,
  MARK_ADDRESS,
  SAVE_ADDRESS,
  DELETE_ADDRESS,
  ADD_NEWFORM,
} from '../constants/action_types';

const addressWithId = (action) => {
  const randomId = Math.random();
  return {
    ...action,
    id: randomId,
  };
};

const sortedAddress = (action) => (
   action.customerAddress
    .sort((a, b) =>
    (a.firstName.toString().toLowerCase() + a.lastName.toString().toLowerCase())
    > (b.firstName.toString().toLowerCase() + b.lastName.toString().toLowerCase()))
    .map((item, i) => item
    )
  );
const initialState = {
  customerAddress: [],
  addressToModify: '',
  editClicked: '',
};
const addressList = (state = initialState, action) => {
  let addressListTemp;
  let index;
  let matchedAddress;

  switch (action.type) {
    case ADD_ADDRESS: {
      const added = { ...state,
        customerAddress: [...state.customerAddress, addressWithId(action.customer)] };
      sortedAddress(added);
      return added;
    }
    case MARK_ADDRESS: {
      addressListTemp = [...state.customerAddress];
      index = addressListTemp.findIndex(address => address.id === action.id);
      matchedAddress = addressListTemp[index];
      const marked = { ...state, addressToModify: matchedAddress, editClicked: '' };
      return marked;
    }
    case SAVE_ADDRESS: {
      addressListTemp = [...state.customerAddress];
      index = addressListTemp.findIndex(address => address.id === action.modifiedCustomer.id);
      addressListTemp[index] = action.modifiedCustomer;
      const saved = { ...state, customerAddress: addressListTemp };
      sortedAddress(saved);
      return saved;
    }
    case DELETE_ADDRESS: {
      addressListTemp = [...state.customerAddress];
      const listAfterDelete = addressListTemp.filter(address => address.id !== action.id);
      const afterDeletion = { ...state, customerAddress: listAfterDelete, addressToModify: '' };
      return afterDeletion;
    }
    case ADD_NEWFORM: {
      return { ...state, addressToModify: '' };
    }
    default:
      return state;
  }
};

export default addressList;
