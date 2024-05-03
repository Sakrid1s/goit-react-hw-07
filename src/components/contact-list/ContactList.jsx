import { useSelector } from 'react-redux';
import Contact from '../contact/Contact';
import css from './ContactList.module.css';
// import { selectNameFilter } from '../../redux/filtersSlice';
import { selectContact } from '../../redux/contactsSlice';
import Loader from '../loader/Loader';
import ErrorMessage from '../error/ErrorMessage';
import { selectFilteredContacts } from '../../redux/contactsSlice';

const ContactList = () => {
  const { isError, isLoading } = useSelector(selectContact);
  const contactsFilter = useSelector(selectFilteredContacts);
  // const filter = useSelector(selectNameFilter);

  // const filteredContacts = items.filter(contact => {
  //   const filteredByName = contact.name
  //     .toLowerCase()
  //     .includes(filter.toLowerCase());
  //   const filteredByNumber = contact.number
  //     .toLowerCase()
  //     .includes(filter.toLowerCase());
  //   return filteredByName || filteredByNumber;
  // });

  return (
    <>
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={isError} />}
      {contactsFilter.length > 0 ? (
        <div className={css.contactList}>
          {contactsFilter.map(contact => (
            <Contact contact={contact} key={contact.id} />
          ))}
        </div>
      ) : (
        <p>There are no contacts</p>
      )}
    </>
  );
};

export default ContactList;
