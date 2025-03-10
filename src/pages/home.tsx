import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Github, ExternalLink, Briefcase, Mail, Code, GraduationCap, Phone, Lock } from 'lucide-react'
import { Portfolio } from "@/services"
import { VITE_PORTFOLIO_ACCESS_TOKEN } from "@/constants"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [darkMode, setDarkMode] = useState(true)
  const [error, setError] = useState<boolean>(false)
  const [isUnauthorized, setIsUnauthorized] = useState<boolean>(false)
  const [profileData, setProfileData] = useState<any>({})
  const [visibleFields, setVisibleFields] = useState({
    avatar: -1,
    bio: -1,
    designation: -1,
    education: -1,
    email: -1,
    experience: -1,
    fullName: -1,
    location: -1,
    projects: -1,
    skills: -1,
    username: -1,
  })

  useEffect(() => {
    ;(async () => {
      try {
        const response = await Portfolio.getPublicPortfolio("default-portfolio-03", VITE_PORTFOLIO_ACCESS_TOKEN)
  
        if (response.status === 200 && response.data.data?.portfolio) {
          const data = response.data.data.portfolio
          setProfileData(data?.user)
          setVisibleFields(data.visibleFields)
        } else if (response.status === 401) {
          setIsUnauthorized(true)
        } else {
          setError(true)
        }
      } catch (err) {
        setError(true)
        console.error("Error fetching portfolio:", err)
        setIsUnauthorized(true)
      }
    })()
  }, [])

  if (isUnauthorized) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <div className="flex flex-col items-center text-center">
            <Lock className="h-16 w-16 text-red-500" />
            <h1 className="mt-4 text-2xl font-bold text-gray-800">Access Denied</h1>
            <p className="mt-2 text-gray-600">
              You don't have permission to view this page. Please contact your administrator if you believe this is a
              mistake.
            </p>
            <div className="mt-6 flex gap-4 ">
              <Button
                className="rounded-xl bg-blue-500 px-6 py-3 text-white bg-neutral-950 hover:bg-neutral-800"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Header */}
        <motion.div 
          className="flex justify-between items-center mb-16"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-3">
            <Code className="h-7 w-7 text-gray-900 dark:text-white" />
            <span className="text-xl font-medium text-gray-900 dark:text-white">{profileData.fullName}</span>
          </div>
          <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
        </motion.div>

        {/* Profile Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-20"
        >
          {visibleFields.avatar !== 0 && (
            <motion.div variants={itemVariants}>
              <Avatar className="w-40 h-40 mx-auto mb-8 border-4 border-white dark:border-gray-800 shadow-2xl">
                <AvatarImage src={profileData.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-4xl">
                  {profileData.fullName?.split(' ').map((n:any) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {visibleFields.fullName !== 0 && <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">{profileData.fullName}</h1>}
              {visibleFields.designation !== 0 && <p className="text-2xl text-gray-600 dark:text-gray-400 mb-4">{profileData.designation}</p>}
              {visibleFields.bio !== 0 && <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">{profileData.bio}</p>}
            </motion.div>
          )}

          <motion.div 
            variants={itemVariants}
            className="flex justify-center gap-4 flex-wrap"
          >
            {visibleFields.email !== 0 && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-all"
                href={`mailto:${profileData.email}`}
              >
                <Mail className="h-5 w-5" />
                Email Me
              </motion.a>
            )}
            {profileData.phone && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                href={`tel:${profileData.phone}`}
              >
                <Phone className="h-5 w-5" />
                Call Me
              </motion.a>
            )}
          </motion.div>
        </motion.section>

        {/* Skills Section */}
        {visibleFields.skills !== 0 && (
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-20"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Skills
            </motion.h2>
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {profileData.skills?.map((skill:any, i:number) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center"
                >
                  <span className="text-gray-900 dark:text-white">{skill}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}

        {/* Experience Section */}
        {visibleFields.experience !== 0 && (
          <motion.section
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="mb-16"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Experience</h2>
            <div className="space-y-8">
              {profileData.experience?.map((exp:any, index:number) => (
                <Card key={index} className="border border-gray-200 dark:border-gray-700">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <Briefcase className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <CardTitle className="text-lg">{exp.position}</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{exp.company} • {new Date(exp.startDate).getFullYear()} - {exp.currentlyWorking ? 'Present' : new Date(exp.endDate).getFullYear()}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="text-gray-600 dark:text-gray-300">
                    <ul className="list-disc pl-6 space-y-2">
                      {exp.description.split('\n').map((item:any, i:number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>
        )}

        {/* Education Section */}
        {visibleFields.education !== 0 && (
          <motion.section
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Education</h2>
            {profileData.education?.map((edu:any, index:number) => (
              <Card key={index} className="border border-gray-200 dark:border-gray-700">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <GraduationCap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <CardTitle className="text-lg">{edu.degree} in {edu.fieldOfStudy}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{edu.institution} • {new Date(edu.startDate).getFullYear()} - {edu.currentlyStudying ? 'Present' : new Date(edu.endDate).getFullYear()}</p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </motion.section>
        )}

        {/* Projects Section */}
        {visibleFields.projects !== 0 && (
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-20"
          >
            <motion.h2 
              variants={itemVariants} 
              className="text-3xl font-bold text-indigo-900 dark:text-indigo-200 mb-8 flex items-center gap-3"
            >
              <Code className="h-7 w-7" />
              Projects
            </motion.h2>
            <motion.div 
              variants={itemVariants} 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {profileData.projects?.map((project:any, index:number) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="group relative overflow-hidden rounded-xl bg-white dark:bg-indigo-900/20 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-indigo-900 dark:text-indigo-200 mb-3">
                      {project.name}
                    </h3>
                    <p className="text-indigo-700 dark:text-indigo-300 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech:any, i:number) => (
                        <Badge 
                          key={i}
                          className="bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-700"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.repositoryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-100"
                      >
                        <Github className="h-5 w-5" />
                        Repository
                      </motion.a>
                      {project.liveDemoLink && (
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.liveDemoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-100"
                        >
                          <ExternalLink className="h-5 w-5" />
                          Live Demo
                        </motion.a>
                      )}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        )}
      </div>
    </div>
  )
}
