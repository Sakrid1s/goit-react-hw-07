import { VscError } from 'react-icons/vsc';
import css from './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => {
  return (
    <div className={css.errorDiv}>
      <VscError className={css.errorImg} />
      <p className={css.errorMsg}>{message}</p>
    </div>
  );
};

export default ErrorMessage;
