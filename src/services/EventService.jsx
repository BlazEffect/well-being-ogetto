import axios from "axios";

const getAllEvents = async () => {
  const events = await axios.get('/api/media/all_cards');

  if (events.status === 200) {
    return events.data.cards;
  }
}

const addEvent = async (name, description, timeStart, timeEnd, url) => {
  try {
    await axios.post('/api/add_card?name=' + name + '&description=' + description + '&time_start=' + timeStart + '&time_end=' + timeEnd + '&url=' + url)
  } catch (error) {
    throw new Error('Ошибка при выполнении запроса');
  }
}

const deleteEvent = async (cardId, token) => {
  try {
    await axios.delete('/api/delete_card?card_id=' + cardId + '&token=' + token);
  } catch (error) {
    throw new Error('Ошибка при выполнении запроса');
  }
}

export {getAllEvents, deleteEvent, addEvent};
