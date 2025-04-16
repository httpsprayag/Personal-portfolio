import { motion } from 'framer-motion'
import styles from '../../styles/pages/Contact.module.css'

const Contact = () => {
  return (
    <section className={styles.contact} id="contact">
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className={styles.title}>Let's Connect!</h2>
        
        <div className={styles.formContainer}>
          <div className={styles.emailInfo}>
            <span>To:</span>
            <span className={styles.email}>prayag@example.com</span>
          </div>
          
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="from">From:</label>
              <input type="email" id="from" className={styles.input} />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="message">Message:</label>
              <textarea id="message" className={styles.textarea} rows={5} />
            </div>
            
            <button type="submit" className={styles.submitButton}>
              Send
            </button>
          </form>
        </div>

        <div className={styles.socialLinks}>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            Github
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            LinkedIn
          </a>
          <a href="/resume.pdf" download className={styles.socialLink}>
            Resume
          </a>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact 