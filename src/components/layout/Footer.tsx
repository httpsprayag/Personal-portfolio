import { motion } from 'framer-motion'
import styles from '../../styles/components/Footer.module.css'

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com' },
    { name: 'Twitter', url: 'https://twitter.com' },
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <motion.div 
          className={styles.social}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              {link.name}
            </a>
          ))}
        </motion.div>
        
        <motion.p
          className={styles.copyright}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          © {new Date().getFullYear()} Prayag Bhimani. All rights reserved.
        </motion.p>
      </div>
    </footer>
  )
}

export default Footer 