import axios from "axios";

const getAllEvents = async () => {
  const events = await axios.get('/api/media/all_cards');

  if (events.status === 200) {
    return events.data.cards;
  }
}

export {getAllEvents};
