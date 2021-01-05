import axios from 'axios'; //maybe implement

export const createEvent = event => (
  fetch('api/event', {
    method: 'POST',
    body: JSON.stringify(event),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  );

export const deleteEvent = async (id) => {
  const response = await fetch('/api/event', {
    method: 'DELETE',
    body: JSON.stringify(id),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const info = await response.json();
  if (response.ok) {
      console.log(info)
  }
}

export const getAllEvents = async () => {
  const response = await fetch('api/event')
  const data = await response.json()
  return data;
}

export const joinEvent = async (data) => {
  const response = await fetch('/api/event/add-teammate', {
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