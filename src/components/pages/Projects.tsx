import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Text3D from '../three/Text3D'
import styles from '../../styles/pages/Projects.module.css'
import { FaExternalLinkAlt, FaCode, FaServer, FaMobileAlt, FaDatabase } from 'react-icons/fa'
import { HiOutlineLightBulb, HiOutlineSparkles } from 'react-icons/hi'

const projects = [
  {
    title: 'Jaycar Electronics',
    description: 'E-commerce platform for electronics and components',
    technologies: ['React', 'TypeScript', 'Material-UI'],
    link: 'https://www.jaycar.com.au/',
    features: [
      'E-commerce functionality',
      'Product catalog management',
      'Shopping cart system',
      'User authentication'
    ]
  },
  {
    title: 'Digidoe',
    description: 'Digital platform for business solutions',
    technologies: ['React', 'TypeScript', 'Material-UI'],
    link: 'https://www.digidoe.com/',
    features: [
      'Business management tools',
      'User dashboard',
      'Analytics integration',
      'Responsive design'
    ]
  },
  {
    title: 'Plantology',
    description: 'Plant care application with AI integration',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Gemini API'],
    features: [
      'AI-powered plant care recommendations',
      'User plant collection management',
      'Care schedule tracking',
      'Plant identification'
    ]
  },
  {
    title: 'Regenesys Management System',
    description: 'Comprehensive student portal for educational operations',
    technologies: ['React', 'TypeScript', 'Material-UI', 'Next.js'],
    link: 'https://rms.regenesys.net',
    features: [
      'Admission management',
      'Corporate operations',
      'Assessment tracking',
      'Class management system'
    ]
  },
  {
    title: 'GPS Phone Tracker',
    description: 'Real-time location tracking application',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Socket.io'],
    features: [
      'Real-time location tracking',
      'Geofencing capabilities',
      'Location history',
      'Push notifications'
    ]
  },
  {
    title: 'Become Your Creator',
    description: 'Coaching and yoga sessions booking platform',
    technologies: ['React', 'Material-UI', 'Node.js', 'Express', 'MongoDB'],
    features: [
      'Session booking system',
      'Coach management',
      'Payment integration',
      'User profiles'
    ]
  }
]

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }), [])

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }), [])

  const getTechIcon = (tech: string) => {
    switch (tech.toLowerCase()) {
      case 'react':
      case 'typescript':
      case 'next.js':
      case 'material-ui':
        return <FaCode />
      case 'node.js':
      case 'express':
        return <FaServer />
      case 'mongodb':
        return <FaDatabase />
      case 'socket.io':
        return <FaMobileAlt />
      default:
        return <HiOutlineLightBulb />
    }
  }

  return (
    <section className={styles.projects} id="projects" ref={containerRef}>
      <div className={styles.backgroundGradient} />
      <div className={styles.backgroundPattern} />
      
      <motion.div 
        className={styles.projectsContent}
        style={{ y, opacity, scale }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className={styles.header} variants={itemVariants}>
          <h2 className={styles.title}>Featured Projects</h2>
          <div className={styles.titleUnderline} />
        </motion.div>

        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className={styles.projectCard}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 40px rgba(0, 242, 254, 0.2)"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className={styles.projectHeader}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <div className={styles.projectLinks}>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              </div>

              <p className={styles.projectDescription}>{project.description}</p>

              <div className={styles.technologies}>
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className={styles.tech}>
                    {getTechIcon(tech)}
                    {tech}
                  </span>
                ))}
              </div>

              <div className={styles.features}>
                {project.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className={styles.feature}>
                    <HiOutlineSparkles className={styles.featureIcon} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className={styles.canvasContainer}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Text3D
              text="Projects"
              position={[-1, 0, 0]}
              color="#00f2fe"
            />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Projects 