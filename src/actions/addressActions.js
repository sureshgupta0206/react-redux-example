import {
ADD_ADDRESS,
SAVE_ADDRESS,
DELETE_ADDRESS,
MARK_ADDRESS,
ADD_NEWFORM } from '../constants/action_types';

export const addAddress = (customer) => {
  const action = {
    type: ADD_ADDRESS,
    customer,
  };
  return action;
};

export const saveAddress = (id, customer) => {
  const modifiedCustomer = { ...customer, id };
  const action = {
    type: SAVE_ADDRESS,
    modifiedCustomer,
  };
  return action;
};

export const deleteAddress = (id) => {
  const action = {
    type: DELETE_ADDRESS,
    id,
  };
  return action;
};

export const markAddress = (id) => {
  const action = {
    type: MARK_ADDRESS,
    id,
  };
  return action;
};

export const addNewForm = () => {
  const action = {
    type: ADD_NEWFORM,
  };
  return action;
};
