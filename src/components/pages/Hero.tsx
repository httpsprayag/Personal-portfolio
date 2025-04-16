import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useMemo, useCallback, useState } from 'react'
import styles from '../../styles/pages/Hero.module.css'
import { FaGithub, FaLinkedin, FaTwitter, FaArrowDown } from 'react-icons/fa'
import { HiOutlineCode, HiOutlineLightBulb, HiOutlineSparkles } from 'react-icons/hi'

const Typewriter = ({ text, delay = 100, onComplete }: { text: string, delay?: number, onComplete?: () => void }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (currentIndex === text.length && !isDeleting) {
      setTimeout(() => setIsDeleting(true), 2000)
    } else if (currentIndex === 0 && isDeleting) {
      setIsDeleting(false)
      onComplete?.()
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(text.slice(0, currentIndex - 1))
        setCurrentIndex(prev => prev - 1)
      } else {
        setDisplayText(text.slice(0, currentIndex + 1))
        setCurrentIndex(prev => prev + 1)
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [currentIndex, delay, isDeleting, text, onComplete])

  return <span className={styles.typewriter}>{displayText}</span>
}

const Hero = () => {
  const avatarRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const [isVisible, setIsVisible] = useState(false)
  const [showDeveloper, setShowDeveloper] = useState(false)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!avatarRef.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = avatarRef.current.getBoundingClientRect()
    const x = (clientX - left - width / 2) / 50
    const y = (clientY - top - height / 2) / 50
    avatarRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          window.addEventListener('mousemove', handleMouseMove)
        } else {
          setIsVisible(false)
          window.removeEventListener('mousemove', handleMouseMove)
        }
      },
      { threshold: 0.1 }
    )

    if (avatarRef.current) {
      observer.observe(avatarRef.current)
    }

    return () => {
      observer.disconnect()
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }), [])

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }), [])

  const floatingVariants = useMemo(() => ({
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }), [])

  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.8])
  const y = useTransform(scrollY, [0, 300], [0, 100])

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.backgroundGradient} />
      <div className={styles.backgroundPattern} />
      
      <motion.div 
        className={styles.heroContent}
        style={{ opacity, scale, y }}
      >
        <motion.div 
          ref={contentRef}
          className={styles.textContent}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className={styles.greeting}>
            <motion.span 
              className={styles.wave}
              animate={{ rotate: [0, 15, -10, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              👋
            </motion.span>
            <h3>Hello, I'm</h3>
          </motion.div>
          
          <motion.div variants={itemVariants} className={styles.nameContainer}>
            <h1 className={styles.name}>
              {!showDeveloper ? (
                <Typewriter 
                  text="Prayag Bhimani" 
                  delay={150} 
                  onComplete={() => setShowDeveloper(true)} 
                />
              ) : (
                <Typewriter 
                  text="Web Developer" 
                  delay={100}
                />
              )}
            </h1>
            <div className={styles.nameUnderline} />
          </motion.div>
          
          <motion.div variants={itemVariants} className={styles.roleContainer}>
            <div className={styles.specialties}>
              <motion.span 
                className={styles.specialty}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <HiOutlineCode className={styles.specialtyIcon} />
                <span>MERN Stack</span>
              </motion.span>
              <motion.span 
                className={styles.specialty}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <HiOutlineLightBulb className={styles.specialtyIcon} />
                <span>Problem Solver</span>
              </motion.span>
              <motion.span 
                className={styles.specialty}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <HiOutlineSparkles className={styles.specialtyIcon} />
                <span>Creative Mind</span>
              </motion.span>
            </div>
          </motion.div>

          <motion.p 
            variants={itemVariants} 
            className={styles.bio}
          >
            Passionate about creating seamless web experiences and turning innovative ideas into reality. 
            Specialized in modern web technologies and committed to writing clean, efficient code.
          </motion.p>

          <motion.div variants={itemVariants} className={styles.cta}>
            <motion.a 
              href="#contact" 
              className={styles.primaryBtn}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Let's Connect
            </motion.a>
            <motion.a 
              href="#projects" 
              className={styles.secondaryBtn}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              View Projects
            </motion.a>
          </motion.div>

          <motion.div variants={itemVariants} className={styles.socialLinks}>
            <motion.a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FaGithub />
            </motion.a>
            <motion.a 
              href="https://linkedin.com/in/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FaLinkedin />
            </motion.a>
            <motion.a 
              href="https://twitter.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <FaTwitter />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div 
          ref={avatarRef}
          className={styles.avatarWrapper}
          variants={floatingVariants}
          initial="initial"
          animate={isVisible ? "animate" : "initial"}
        >
          <div className={styles.avatarContainer}>
            <img 
              src="/images/avatar.png" 
              alt="Prayag Bhimani" 
              className={styles.avatar}
              loading="eager"
              width={400}
              height={400}
            />
            <div className={styles.avatarGlow} />
            <div className={styles.avatarBorder} />
            
            <div className={styles.avatarDecorations}>
              <div className={styles.decorationCircle} />
              <div className={styles.decorationCircle} />
              <div className={styles.decorationCircle} />
              <div className={styles.decorationCircle} />
            </div>
            
            <div className={styles.avatarParticles}>
              <div className={styles.particle} />
              <div className={styles.particle} />
              <div className={styles.particle} />
              <div className={styles.particle} />
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        className={styles.scrollIndicator}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span>Scroll Down</span>
        <FaArrowDown className={styles.scrollArrow} />
      </motion.div>
    </section>
  )
}

export default Hero 