import axios from 'axios';
import { receiveErrorsFunc } from '../actions/error'; //need to implement somehow for front end error display

export const requestEmail = async input => {
  return await axios
    .post('/api/users/forgotpassword', input)
    .catch((error) => {
      if(error.response.data.message){
      alert(error.response.data.message); //temporary solution
    }})
  };