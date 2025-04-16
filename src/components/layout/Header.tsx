import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { FaBars, FaTimes, FaHome, FaCode, FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-scroll'
import styles from '../../styles/layout/Header.module.css'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isHovered, setIsHovered] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()

  const headerOpacity = useTransform(scrollY, [0, 100], [0, 1])
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.95])
  const headerBlur = useTransform(scrollY, [0, 100], [0, 10])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Update active section based on scroll position
      const sections = ['hero', 'about', 'projects', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', icon: <FaHome />, to: 'hero' },
    { name: 'Projects', icon: <FaCode />, to: 'projects' },
    { name: 'Contact', icon: <FaEnvelope />, to: 'contact' }
  ]

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/yourusername' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/yourusername' },
    { icon: <FaTwitter />, url: 'https://twitter.com/yourusername' }
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  }

  const logoVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  }

  const mobileMenuVariants = {
    closed: { 
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    open: { 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  }

  return (
    <motion.header
      ref={headerRef}
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        opacity: headerOpacity,
        scale: headerScale,
        backdropFilter: `blur(${headerBlur}px)`
      }}
    >
      <motion.div 
        className={styles.logo}
        variants={logoVariants}
        initial="initial"
        whileHover="hover"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.div
          className={styles.logoContainer}
          animate={{
            boxShadow: isHovered 
              ? "0 0 20px rgba(0, 242, 254, 0.3)" 
              : "0 0 10px rgba(0, 242, 254, 0.1)"
          }}
        >
          <motion.span
            className={styles.logoText}
            animate={{
              background: isHovered
                ? "linear-gradient(45deg, #fff, #00f2fe, #fff)"
                : "linear-gradient(45deg, #fff, #00f2fe)"
            }}
          >
            PB
          </motion.span>
          <motion.div 
            className={styles.logoGlow}
            animate={{
              opacity: isHovered ? 0.8 : 0.5,
              scale: isHovered ? 1.2 : 1
            }}
          />
        </motion.div>
      </motion.div>

      {/* Desktop Navigation */}
      <nav className={styles.desktopNav}>
        <motion.ul>
          {navItems.map((item, index) => (
            <motion.li
              key={item.name}
              custom={index}
              variants={itemVariants}
            >
              <Link
                to={item.to}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className={`${styles.navLink} ${activeSection === item.to ? styles.active : ''}`}
                onSetActive={() => setActiveSection(item.to)}
              >
                <motion.span 
                  className={styles.icon}
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {item.icon}
                </motion.span>
                <span className={styles.linkText}>{item.name}</span>
                <motion.div 
                  className={styles.linkIndicator}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeSection === item.to ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </nav>

      {/* Social Links */}
      <div className={styles.socialLinks}>
        {socialLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            whileHover={{ 
              y: -5, 
              scale: 1.2,
              color: "#00f2fe"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {link.icon}
          </motion.a>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <motion.button
        className={styles.mobileMenuButton}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </motion.button>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className={styles.mobileOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              className={styles.mobileNav}
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={e => e.stopPropagation()}
            >
              <div className={styles.mobileHeader}>
                <motion.div 
                  className={styles.mobileLogo}
                  whileHover={{ scale: 1.1 }}
                >
                  PB
                </motion.div>
                <div className={styles.mobileSocialLinks}>
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.mobileSocialLink}
                      whileHover={{ 
                        y: -3,
                        scale: 1.2,
                        color: "#00f2fe"
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
              <motion.ul>
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.to}
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                      className={`${styles.mobileNavLink} ${activeSection === item.to ? styles.active : ''}`}
                      onSetActive={() => setActiveSection(item.to)}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.span 
                        className={styles.icon}
                        whileHover={{ rotate: 360 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        {item.icon}
                      </motion.span>
                      <span className={styles.linkText}>{item.name}</span>
                      <motion.div 
                        className={styles.mobileLinkIndicator}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: activeSection === item.to ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header 