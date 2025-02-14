
import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Briefcase, Mail, Code, GraduationCap, Rocket, Terminal } from "lucide-react"

export default function PortfolioPage() {
  const [darkMode, setDarkMode] = useState(false)
  const { scrollYProgress } = useScroll()
  const x = useTransform(scrollYProgress, [0, 1], [0, 100])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 ${darkMode ? "dark" : ""}`}>
      <motion.div 
        className="fixed top-0 left-0 w-full h-2 bg-blue-500 z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* Animated Header */}
        <motion.header 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Terminal className="h-6 w-6 text-blue-500 dark:text-blue-400" />
            <span className="text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              John Doe
            </span>
          </motion.div>
          <motion.div whileHover={{ rotate: 15 }}>
            <Switch 
              checked={darkMode} 
              onCheckedChange={toggleDarkMode} 
              className="data-[state=checked]:bg-white"
            />
          </motion.div>
        </motion.header>

        {/* Profile Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-16 relative"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl opacity-10 -z-10"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="inline-block mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Avatar className="w-32 h-32 mx-auto border-4 border-white/50 dark:border-gray-800/50 shadow-2xl">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-3xl">
                JD
              </AvatarFallback>
            </Avatar>
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            John Doe
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Full Stack Developer
          </p>
          <motion.a
            whileHover={{ 
              scale: 1.05,
              background: "linear-gradient(45deg, #3b82f6, #8b5cf6)"
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg font-medium"
            href="mailto:john.doe@example.com"
          >
            <Mail className="h-5 w-5" />
            Get in Touch
          </motion.a>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="mb-16"
        >
          <motion.h2 
            className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center"
            variants={fadeIn}
          >
            Technical Expertise
          </motion.h2>
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            variants={staggerChildren}
          >
            {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'GraphQL'].map((skill, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center gap-3">
                  <Code className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                  <span className="font-medium text-gray-900 dark:text-gray-100">{skill}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="mb-16"
        >
          <motion.h2 
            className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center"
            variants={fadeIn}
          >
            Professional Journey
          </motion.h2>
          <div className="space-y-8 relative">
            <div className="absolute left-6 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 opacity-20 dark:opacity-30" />
            {[
              {
                title: "Senior Developer",
                company: "Tech Corp",
                period: "2020 - Present",
                details: [
                  "Led enterprise application development",
                  "Implemented modern web architecture",
                  "Mentored junior team members"
                ]
              },
              {
                title: "Web Developer",
                company: "Digital Solutions",
                period: "2018 - 2020",
                details: [
                  "Developed client-facing applications",
                  "Optimized application performance",
                  "Collaborated with design teams"
                ]
              }
            ].map((exp, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                className="relative pl-12 group"
                whileHover={{ x: 10 }}
              >
                <div className="absolute left-6 top-4 w-3 h-3 rounded-full bg-blue-500" />
                <Card className="bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-col md:flex-row md:items-center gap-4 pb-2">
                    <Briefcase className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                    <div>
                      <CardTitle className="text-lg">{exp.title}</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {exp.company} • {exp.period}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="text-gray-600 dark:text-gray-300">
                    <ul className="list-disc pl-6 space-y-2">
                      {exp.details.map((detail, j) => (
                        <motion.li 
                          key={j}
                          className="flex items-center gap-2"
                          whileHover={{ x: 5 }}
                        >
                          <Rocket className="h-4 w-4 text-purple-500" />
                          {detail}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="mb-16"
        >
          <motion.h2 
            className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center"
            variants={fadeIn}
          >
            Education
          </motion.h2>
          <motion.div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 p-1 rounded-2xl"
            variants={fadeIn}
          >
            <Card className="bg-white dark:bg-gray-800 rounded-xl">
              <CardHeader className="flex items-center gap-4 pb-2">
                <GraduationCap className="h-8 w-8 text-purple-500" />
                <div>
                  <CardTitle className="text-lg">Computer Science</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Stanford University • 2016 - 2020
                  </p>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
}
