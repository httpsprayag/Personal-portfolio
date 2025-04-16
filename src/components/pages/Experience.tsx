import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Text3D from '../three/Text3D'
import styles from '../../styles/pages/Experience.module.css'
import { FaBuilding, FaCalendarAlt, FaMapMarkerAlt, FaCode } from 'react-icons/fa'

const experiences = [
  {
    company: "Regenesys Business School",
    position: "Assosiate React Developer",
    period: "2020 - Present",
    location: "South Africa, (Remote)",
    description: "Led the development of multiple high-traffic web applications using React and TypeScript. Implemented modern UI/UX practices and mentored junior developers.",
    skills: ["React", "TypeScript", "Next.js", "Redux","Material-UI"]
  },
  {
    company: "Qtonz Infosoft",
    position: "Mern Stack Developer",
    period: "May 2024 - December 2024",
    location: "Rajkot, Gujarat, India",
    description: "Developed responsive web applications and collaborated with design teams to implement pixel-perfect UIs. Optimized performance and accessibility.",
    skills: ["JavaScript", "React", "Node.js", "Express", "MongoDB", "Socket.io"]
  },
  {
    company: "Bonzark Technologies",
    position: "Junior Web Developer",
    period: "July 2022 - May 2024",
    location: "Rajkot, Gujarat, India",
    description: "Built and maintained client websites, focusing on clean code and modern web standards. Participated in code reviews and team collaborations.",
    skills: ["HTML5", "CSS3", "JavaScript", "jQuery", "Bootstrap", "React", "Node.js", "Express", "MongoDB"]
  }
]

const Experience = () => {
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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }), [])

  return (
    <section className={styles.experience} id="experience" ref={containerRef}>
      <div className={styles.backgroundGradient} />
      <div className={styles.backgroundPattern} />
      
      <motion.div 
        className={styles.experienceContent}
        style={{ y, opacity, scale }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className={styles.header} variants={itemVariants}>
          <h2 className={styles.title}>Professional Journey</h2>
          <div className={styles.titleUnderline} />
        </motion.div>

        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              className={styles.timelineItem}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                boxShadow: "0 20px 40px rgba(0, 242, 254, 0.2)"
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className={styles.timelineContent}>
                <div className={styles.companyHeader}>
                  <FaBuilding className={styles.companyIcon} />
                  <h3 className={styles.companyName}>{exp.company}</h3>
                </div>
                
                <div className={styles.positionInfo}>
                  <h4 className={styles.position}>{exp.position}</h4>
                  <div className={styles.metaInfo}>
                    <span className={styles.metaItem}>
                      <FaCalendarAlt className={styles.metaIcon} />
                      {exp.period}
                    </span>
                    <span className={styles.metaItem}>
                      <FaMapMarkerAlt className={styles.metaIcon} />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p className={styles.description}>{exp.description}</p>

                <div className={styles.skillsList}>
                  {exp.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className={styles.skill}>
                      <FaCode className={styles.skillIcon} />
                      {skill}
                    </span>
                  ))}
                </div>
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
              text="Experience"
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

export default Experience 