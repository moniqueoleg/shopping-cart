import { motion } from 'framer-motion';

import styles from './index.module.scss';

const Backdrop = ({ toggleModal }) => {
  const handleClick = () => {
    if (toggleModal) {
      toggleModal();
    }
  };

  return (
    <motion.div
      key="backdrop"
      className={styles.backdrop}
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      exit={{ opacity: 0 }}
    />
  );
};

export default Backdrop;
