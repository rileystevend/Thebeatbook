import axios from 'axios';

export const openLoginModal = () => ({ type: 'OPENLOGINMODAL' });
export const closeLoginModal = () => ({ type: 'CLOSELOGINMODAL' });
export const openRegisterModal = () => ({ type: 'OPENREGISTERMODAL' });
export const closeRegisterModal = () => ({ type: 'CLOSEREGISTERMODAL' });
export const logout = () => ({ type: 'LOGOUT' });
export const loadArtistPage = () => ({ type: 'LOADARTISTPAGE' });
export const loadVenuePage = () => ({ type: 'LOADVENUEPAGE' });

export const submitLogin = (username, password) => dispatch => axios({
  method: 'post',
  url: '/login',
  data: {
    username,
    password,
  },
}).then((res) => {
  if (res.data !== 'your passwords dont match' && res.data !== 'Username does not exist') {
    const type = res.data[0].user_type;
    dispatch(setBookings(res.data[2]));
    if (type === 'artist') {
      dispatch(loadArtistPage(res.data));
      dispatch(setArtist(res.data[1].artist_id));
    } if (type === 'venue') {
      dispatch(loadVenuePage(res.data));
      dispatch(setVenue(res.data[1].artist_id));
    }
  }
}).catch((err) => {
  console.error(err);
});

export const setArtist = artistId => ({ type: 'SET_ARTISTID', payload: artistId });
export const setVenue = venueId => ({ type: 'SET_VENUEID', payload: venueId });
export const setBookings = bookings => ({ type: 'SET_BOOKINGS', payload: bookings });
export const addBook = booking => ({ type: 'ADD_BOOKING', payload: booking });
export const addBooking = booking => (dispatch) => {
  dispatch(addBook(booking));
};

// ************************************************* TOGGLE LOADING BEORE ANY ACTIONS ; STILL NEED TO WRITE IT***

export const getArtistsByCity = city => dispatch => axios({
  method: 'get',
  url: 'artist/city',
  params: {
    city,
  },
}).then((res) => {
  dispatch(renderArtistCityList(res.data));
}).catch((err) => {
  console.error(err);
});

const renderArtistCityList = list => ({ type: 'RENDERARTISTCITYLIST', payload: list });
