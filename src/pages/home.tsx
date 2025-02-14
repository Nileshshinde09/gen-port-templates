
import {  useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Briefcase, GraduationCap, Mail, MapPin, Moon, Sun, Code, Terminal, Linkedin, Github } from "lucide-react"

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8 },
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-rose-50 to-cyan-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500 ${darkMode ? "dark" : ""}`}>
      {/* Floating Background Shapes */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-rose-200/30 dark:bg-rose-900/20 rounded-full blur-3xl -top-48 -left-48" />
        <div className="absolute w-96 h-96 bg-cyan-200/30 dark:bg-cyan-900/20 rounded-full blur-3xl -bottom-48 -right-48" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8 relative">
        {/* Header Section */}
        <header className="flex justify-between items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <Terminal className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
            <span className="text-xl font-medium bg-gradient-to-r from-cyan-600 to-rose-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-rose-400">
              johndoe.dev
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-6"
          >
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <Sun className="h-5 w-5 text-amber-500" />
              <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
              <Moon className="h-5 w-5 text-slate-500" />
            </div>
          </motion.div>
        </header>

        {/* Hero Section */}
        <motion.section 
          className="flex flex-col lg:flex-row items-center gap-12 mb-28"
          {...fadeIn}
        >
          <div className="relative lg:order-2">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-rose-400 rounded-3xl blur-xl opacity-30" />
            <Avatar className="w-64 h-64 border-4 border-white/50 dark:border-gray-900/50 backdrop-blur-sm shadow-2xl">
              <AvatarImage src="/placeholder.svg" alt="John Doe" />
              <AvatarFallback className="bg-gradient-to-r from-cyan-400 to-rose-400 text-white text-4xl font-medium">
                JD
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="lg:order-1 space-y-6">
            <motion.h1 
              className="text-5xl md:text-6xl font-medium leading-tight"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              Building Digital<br/>
              <span className="bg-gradient-to-r from-cyan-600 to-rose-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-rose-400">
                Experiences
              </span>
            </motion.h1>
            
            <div className="flex space-x-6">
              <motion.a
                whileHover={{ y: -2 }}
                className="flex items-center space-x-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm"
              >
                <Mail className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                <span>Get in touch</span>
              </motion.a>
              
              <div className="flex space-x-4">
                <motion.a whileHover={{ y: -2 }} className="p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full shadow-sm">
                  <Linkedin className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                </motion.a>
                <motion.a whileHover={{ y: -2 }} className="p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full shadow-sm">
                  <Github className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Skills Grid */}
        <motion.section 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-28"
          {...fadeIn}
        >
          {['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS', 'Docker', 'Python', 'MongoDB'].map((skill, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl shadow-sm border border-white/30 dark:border-gray-900/30"
            >
              <div className="h-12 w-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-2xl flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-xl font-serif">{skill}</h3>
            </motion.div>
          ))}
        </motion.section>

        {/* Experience Timeline */}
        <motion.section className="mb-28" {...fadeIn}>
          <div className="space-y-12">
            <h2 className="text-4xl font-medium mb-12">Professional Journey</h2>
            
            {[
              {
                title: "Lead Developer @ TechCorp",
                period: "2020 - Present",
                description: "Leading team in building scalable SaaS solutions",
                tech: ["React", "Node.js", "AWS"]
              },
              {
                title: "Senior Developer @ WebSolutions",
                period: "2018 - 2020",
                description: "Developed enterprise-grade web applications",
                tech: ["Angular", "Python", "Docker"]
              }
            ].map((exp, i) => (
              <motion.div 
                key={i}
                className="group relative pl-8"
                whileHover={{ x: 10 }}
              >
                <div className="absolute left-0 top-4 h-4 w-4 bg-cyan-400 rounded-full" />
                <div className="absolute left-2 top-4 h-full w-1 bg-gradient-to-b from-cyan-400/30 to-rose-400/30" />
                
                <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-white/30 dark:border-gray-900/30 rounded-2xl shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div>
                        <CardTitle className="text-xl mb-2">{exp.title}</CardTitle>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{exp.period}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((t, j) => (
                          <Badge 
                            key={j}
                            className="bg-cyan-100/50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects Showcase */}
        <motion.section className="mb-28" {...fadeIn}>
          <h2 className="text-4xl font-medium mb-12">Featured Work</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "E-commerce Platform",
                description: "Scalable online shopping solution",
                stack: ["React", "Node.js", "MongoDB"]
              },
              {
                title: "AI Analytics Dashboard",
                description: "Real-time business insights",
                stack: ["Python", "TensorFlow", "AWS"]
              }
            ].map((project, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="relative overflow-hidden rounded-2xl shadow-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-rose-400/20" />
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-8 border border-white/30 dark:border-gray-900/30">
                  <h3 className="text-xl font-medium mb-4">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, j) => (
                      <Badge 
                        key={j}
                        variant="outline"
                        className="border-cyan-200 dark:border-cyan-900/30 text-cyan-600 dark:text-cyan-400"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}