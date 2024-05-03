import { createSelector, createSlice } from '@reduxjs/toolkit';
import {
  addContactThunk,
  deleteContactThunk,
  fetchContactsThunk,
} from './contactsOps';
import { selectNameFilter } from './filtersSlice';

const initialState = {
  items: [],
  isError: null,
  isLoading: false,
};

const isPending = action =>
  typeof action.type === 'string' && action.type.endsWith('/pending');

const pendingReducer = state => {
  state.isLoading = true;
  state.items = [];
  state.isError = null;
};

const isRejected = action =>
  typeof action.type === 'string' && action.type.endsWith('/rejected');

const rejectedReducer = (state, action) => {
  state.isError = action.payload;
  state.isLoading = false;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  // reducers: {
  // addContact: (state, action) => {
  //   state.items.push(action.payload);
  // },
  // deleteContact: (state, action) => {
  //   state.items = state.items.filter(item => item.id !== action.payload);
  // },
  // fetchingInProgress: state => {
  //   state.isLoading = true;
  //   state.items = [];
  //   state.isError = null;
  // },
  // fetchingSuccess: (state, action) => {
  //   state.isLoading = false;
  //   state.items = action.payload;
  // },
  // fetchingError: (state, action) => {
  //   state.isError = action.payload;
  //   state.isLoading = false;
  // },
  // },
  extraReducers: builder => {
    builder
      // .addCase(fetchContactsThunk.pending, state => {
      //   state.isLoading = true;
      //   state.items = [];
      //   state.isError = null;
      // })
      .addCase(fetchContactsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      // .addCase(fetchContactsThunk.rejected, (state, action) => {
      //   state.isError = action.payload;
      //   state.isLoading = false;
      // })

      .addCase(addContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        // state.items.push(action.payload);
      })

      // .addCase(deleteContactThunk.pending, state => {
      //   state.isLoading = true;
      //   state.items = [];
      //   state.isError = null;
      // })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      // .addCase(deleteContactThunk.rejected, (state, action) => {
      //   state.isError = action.payload;
      //   state.isLoading = false;
      // })
      .addMatcher(isPending, pendingReducer)
      .addMatcher(isRejected, rejectedReducer);
  },
});

export const selectContact = state => state.contacts;

const selectContacts = state => state.contacts.items;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filters) => {
    return contacts.filter(item =>
      item.name.toLowerCase().includes(filters.toLowerCase())
    );
  }
);

// export const {
//   addContact,
//   deleteContact,
//   fetchingInProgress,
//   fetchingSuccess,
//   fetchingError,
// } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
