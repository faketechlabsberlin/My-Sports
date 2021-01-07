export const signup = user => (
    fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  );

  export const login = user => (
    fetch('api/session', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  );
  
  export const logout = () => (
    fetch('api/session', { method: 'DELETE' })
  );

  export const checkLoggedIn = async (x) => {
    const response = await fetch('/api/session');
    const { user } = await response.json();
    console.log(user)
    let preloadedState = {};
    if (user) {
      preloadedState = {
        session: user
      };
    }
    return preloadedState;
  };

  //axios??