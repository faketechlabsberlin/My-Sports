import axios from 'axios';
import { emailNotFound } from '../actions/error';

export const requestEmail = async input => {
  return await axios
    .post('/api/users/forgotpassword', input)
    .catch((error) => {
      if(error.response.data.message){
        console.log(error.response.data.message)
    }})
  };