import { FaPhoneAlt } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import css from './Contact.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const removeContact = contactId => {
    dispatch(deleteContact(contactId));
  };
  return (
    <div className={css.contactItem}>
      <div>
        <p>
          <FaPhoneAlt /> {contact.name}
        </p>
        <p>
          <IoPerson /> {contact.number}
        </p>
      </div>
      <button
        type="button"
        className={css.contactBtn}
        onClick={() => removeContact(contact.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Contact;
