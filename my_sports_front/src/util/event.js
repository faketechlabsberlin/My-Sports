import axios from 'axios';

export const createEvent = event => (
  fetch('api/event', {
    method: 'POST',
    body: JSON.stringify(event),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  );

export const getAllEvents = async () => {
  const response = await fetch('api/event')
  const data = await response.json()
  return data;
}

export const getOneEvent = async (id) => {
  const response = await fetch('api/event/'+id)
  const data = await response.json()
  return data;
}

export const joinEvent = async (data) => {
  const response = await fetch('api/event/add-teammate', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const info = await response.json();
  if (response.ok) {
    console.log(info)
  }
};