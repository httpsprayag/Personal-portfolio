import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import styles from '../../styles/pages/Skills.module.css'

const skills = [
  { name: 'React', image: '/images/skills/react.svg', category: 'Frontend', description: 'Building interactive UIs' },
  { name: 'TypeScript', image: '/images/skills/typescript.svg', category: 'Frontend', description: 'Type-safe development' },
  { name: 'JavaScript', image: '/images/skills/javascript.svg', category: 'Frontend', description: 'Dynamic web applications' },
  { name: 'HTML5', image: '/images/skills/html5.svg', category: 'Frontend', description: 'Semantic markup' },
  { name: 'CSS3', image: '/images/skills/css3.svg', category: 'Frontend', description: 'Modern styling' },
  { name: 'SASS', image: '/images/skills/sass.svg', category: 'Frontend', description: 'Advanced styling' },
  { name: 'Tailwind', image: '/images/skills/tailwind.svg', category: 'Frontend', description: 'Utility-first CSS' },
  { name: 'Next.js', image: '/images/skills/nextjs.svg', category: 'Frontend', description: 'React framework' },
  { name: 'Node.js', image: '/images/skills/nodejs.svg', category: 'Backend', description: 'Server-side JavaScript' },
  { name: 'Express', image: '/images/skills/express.svg', category: 'Backend', description: 'Web framework' },
  { name: 'MongoDB', image: '/images/skills/mongodb.svg', category: 'Database', description: 'NoSQL database' },
  { name: 'Git', image: '/images/skills/git.svg', category: 'Tools', description: 'Version control' },
  { name: 'GitHub', image: '/images/skills/github.svg', category: 'Tools', description: 'Collaboration' },
  { name: 'VS Code', image: '/images/skills/vscode.svg', category: 'Tools', description: 'Code editor' },
  { name: 'Figma', image: '/images/skills/figma.svg', category: 'Design', description: 'UI/UX design' },
]

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      type: "spring",
      stiffness: 100
    }
  })
}

const SkillCard = ({ skill, index }: { skill: typeof skills[0], index: number }) => {
  return (
    <motion.div
      key={`${skill.name}-${index}`}
      className={styles.skillCard}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
    >
      <div className={styles.cardContent}>
        <div className={styles.cardFront}>
          <div className={styles.imageContainer}>
            <img 
              src={skill.image} 
              alt={skill.name} 
              className={styles.skillImage}
              onError={(e) => {
                e.currentTarget.src = '/images/skills/default.svg'
              }}
            />
          </div>
          <div className={styles.skillInfo}>
            <h3 className={styles.skillName}>{skill.name}</h3>
            <span className={styles.skillCategory}>{skill.category}</span>
          </div>
        </div>
        <div className={styles.cardBack}>
          <h3 className={styles.skillName}>{skill.name}</h3>
          <p className={styles.skillDescription}>{skill.description}</p>
          <span className={styles.skillCategory}>{skill.category}</span>
        </div>
      </div>
    </motion.div>
  )
}

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className={styles.skills} id="skills" ref={ref}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className={styles.title}>Skills & Expertise</h2>
        
        <div className={styles.skillsGrid}>
          <div className={styles.skillsTrack}>
            {[...skills, ...skills].map((skill, index) => (
              <SkillCard key={`${skill.name}-${index}`} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Skills 