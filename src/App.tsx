import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from './components/layout/Header'
import Hero from './components/pages/Hero'
import Experience from './components/pages/Experience'
import Projects from './components/pages/Projects'
import Skills from './components/pages/Skills'
import Contact from './components/pages/Contact'
import styles from './styles/App.module.css'
import Services from './components/pages/Services'

function App() {
  return (
    <Router>
      <motion.div 
        className={styles.app}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Experience />
              <Projects />
              <Skills />
              <Services />
              <Contact />
            </>
          } />
        </Routes>
      </motion.div>
    </Router>
  )
}

export default App
