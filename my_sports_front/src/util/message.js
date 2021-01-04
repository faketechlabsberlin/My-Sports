export const getAllMessages = async (id) => {
    const response = await fetch('/api/message/' + id)
    const data = await response.json()
    return data;
  }

  //axios??