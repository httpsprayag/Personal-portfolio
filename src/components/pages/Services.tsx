import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Text3D from '../three/Text3D'
import styles from '../../styles/pages/Services.module.css'
import { FaCode, FaServer, FaMobileAlt, FaDatabase, FaCloud, FaShieldAlt } from 'react-icons/fa'
import {  HiOutlineSparkles } from 'react-icons/hi'

const services = [
  {
    title: "Frontend Development",
    description: "Creating beautiful and responsive user interfaces with modern technologies",
    icon: <FaCode />,
    features: [
      "React & Next.js Development",
      "TypeScript Integration",
      "Responsive Design",
      "UI/UX Optimization"
    ],
    color: "#00f2fe"
  },
  {
    title: "Backend Development",
    description: "Building robust and scalable server-side applications",
    icon: <FaServer />,
    features: [
      "Node.js & Express",
      "API Development",
      "Database Integration",
      "Performance Optimization"
    ],
    color: "#4facfe"
  },
  {
    title: "Mobile Development",
    description: "Developing cross-platform mobile applications",
    icon: <FaMobileAlt />,
    features: [
      "React Native Development",
      "iOS & Android Apps",
      "Push Notifications",
      "Offline Support"
    ],
    color: "#00f2fe"
  },
  {
    title: "Database Management",
    description: "Designing and optimizing database solutions",
    icon: <FaDatabase />,
    features: [
      "MongoDB & PostgreSQL",
      "Data Modeling",
      "Query Optimization",
      "Data Security"
    ],
    color: "#4facfe"
  },
  {
    title: "Cloud Services",
    description: "Deploying and managing cloud infrastructure",
    icon: <FaCloud />,
    features: [
      "AWS & Azure",
      "Serverless Architecture",
      "CI/CD Pipeline",
      "Cloud Security"
    ],
    color: "#00f2fe"
  },
  {
    title: "Security Solutions",
    description: "Implementing robust security measures",
    icon: <FaShieldAlt />,
    features: [
      "Authentication Systems",
      "Data Encryption",
      "Security Audits",
      "Compliance"
    ],
    color: "#4facfe"
  }
]

const Services = () => {
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

  return (
    <section className={styles.services} id="services" ref={containerRef}>
      <div className={styles.backgroundGradient} />
      <div className={styles.backgroundPattern} />
      
      <motion.div 
        className={styles.servicesContent}
        style={{ y, opacity, scale }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className={styles.header} variants={itemVariants}>
          <h2 className={styles.title}>Services</h2>
          <div className={styles.titleUnderline} />
        </motion.div>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className={styles.serviceCard}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: `0 20px 40px ${service.color}40`
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className={styles.serviceIcon} style={{ color: service.color }}>
                {service.icon}
              </div>
              
              <h3 className={styles.serviceTitle} style={{ color: service.color }}>
                {service.title}
              </h3>

              <p className={styles.serviceDescription}>
                {service.description}
              </p>

              <div className={styles.features}>
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className={styles.feature}>
                    <HiOutlineSparkles className={styles.featureIcon} style={{ color: service.color }} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className={styles.glowEffect} style={{ background: `radial-gradient(circle at center, ${service.color}20, transparent 70%)` }} />
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
              text="Services"
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

export default Services 