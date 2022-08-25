import { configureStore } from '@reduxjs/toolkit';
import reducer from './teamMembers';

const createStore = () => {
  return configureStore({ reducer });
};

export default createStore;