export const createEvent = event => (
    fetch('api/event', {
      method: 'POST',
      body: JSON.stringify(event),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  );
