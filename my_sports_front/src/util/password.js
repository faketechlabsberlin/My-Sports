import axios from 'axios';

export const requestEmail = async input => {
  return await axios
    .post('/api/users/forgotpassword', input)
    .catch((error) => {
      if(error.response.data.message){
      alert(error.response.data.message); //temporary solution
    }})
  };