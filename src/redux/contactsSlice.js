import { createSelector, createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './contactsOps';
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
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })

      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })

      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })

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

export const contactsReducer = contactsSlice.reducer;
