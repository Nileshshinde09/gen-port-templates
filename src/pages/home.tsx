"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Briefcase, Mail, MapPin, Moon, Sun, Code, Folder, ChevronRight, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VITE_PORTFOLIO_ACCESS_TOKEN } from "@/constants"
import { Portfolio } from "@/services"

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)

  const [email, setEmail] = useState<string | null>(null)
  const [avatar, setAvatar] = useState<string | null>(null)
  const [designation, setDesignation] = useState<string | null>(null)
  const [location, setLocation] = useState<string | null>(null)
  const [fullName, setFullName] = useState<string | null>(null)
  const [bio, setBio] = useState<string | null>(null)
  const [skills, setSkills] = useState<string[]>([])
  const [education, setEducation] = useState<any>([])
  const [experience, setExperience] = useState<any>([])
  const [projects, setProjects] = useState<any>([])
  const [error, setError] = useState<boolean>(false)
  const [isUnauthorized, setIsUnauthorized] = useState<boolean>(false)
  useEffect(() => {
    ;(async () => {
      try {
        const response = await Portfolio.getPublicPortfolio("default-portfolio-06", VITE_PORTFOLIO_ACCESS_TOKEN)

        if (response.status === 200 && response.data.data?.portfolio) {
          const data = response.data.data.portfolio
          setEmail(data.visibleFields.email === 1 ? data.user.email : null)
          setAvatar(data.visibleFields.avatar === 1 ? data.user.avatar : null)
          setDesignation(data.visibleFields.designation === 1 ? data.user.designation : null)
          setLocation(data.visibleFields.location === 1 ? data.user.location : null)
          setFullName(data.visibleFields.fullName === 1 ? data.user.fullName : null)
          setBio(data.visibleFields.bio === 1 ? data.user.bio : null)
          setSkills(data.visibleFields.skills === 1 ? data.user.skills : [])
          setEducation(data.visibleFields.education === 1 ? data.user.education : [])
          setExperience(data.visibleFields.experience === 1 ? data.user.experience : [])
          setProjects(data.visibleFields.projects === 1 ? data.user.projects : [])
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

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Dark Mode Toggle */}
        <motion.div className="flex justify-end mb-8" {...fadeInUp}>
          <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg">
            <Sun className="h-5 w-5 text-yellow-500" />
            <Switch checked={darkMode} onCheckedChange={toggleDarkMode} className="data-[state=checked]:bg-blue-500" />
            <Moon className="h-5 w-5 text-blue-400" />
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.header className="text-center mb-16" {...fadeInUp}>
          <div className="relative inline-block">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur opacity-30 dark:opacity-50" />
            <Avatar className="w-40 h-40 mx-auto border-4 border-white dark:border-gray-800 shadow-2xl relative">
              <AvatarImage src={avatar || "/placeholder.svg"} alt={fullName || "Profile"} />
              <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white text-3xl font-medium">
                {fullName
                  ? fullName
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                  : "JD"}
              </AvatarFallback>
            </Avatar>
          </div>
          <h1 className="text-5xl font-medium mb-4 mt-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
            {fullName || "John Doe"}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 font-medium">
            {designation || "Full Stack Developer & UI Enthusiast"}
          </p>
          <div className="flex justify-center space-x-6">
            <motion.a
              whileHover={{ y: -2 }}
              className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <MapPin className="mr-2 h-5 w-5 text-blue-500" />
              <span className="text-gray-700 dark:text-gray-300">{location || "New York, NY"}</span>
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
              href={email ? `mailto:${email}` : "#"}
            >
              <Mail className="mr-2 h-5 w-5 text-purple-500" />
              <span className="text-gray-700 dark:text-gray-300">{email || "john.doe@example.com"}</span>
            </motion.a>
          </div>
        </motion.header>

        {/* Skills Grid */}
        <motion.section className="mb-16" {...fadeInUp}>
          <Card className="border-0 shadow-xl dark:bg-gray-800">
            <CardHeader className="pb-0">
              <CardTitle className="text-3xl font-medium flex items-center space-x-3">
                <Code className="h-8 w-8 text-blue-500" />
                <span>Technical Expertise</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6">
              {(skills.length > 0
                ? skills
                : ["React", "TypeScript", "Node.js", "AWS", "GraphQL", "Docker", "Python", "MongoDB"]
              ).map((skill, index) => (
                <motion.div whileHover={{ scale: 1.05 }} key={index}>
                  <Badge className="w-full h-24 flex flex-col items-center justify-center space-y-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-md rounded-xl border-0">
                    <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <Code className="h-5 w-5 text-blue-500" />
                    </div>
                    <span className="text-lg font-medium text-gray-700 dark:text-gray-300">{skill}</span>
                  </Badge>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.section>

        {/* Experience Timeline */}
        <motion.section className="mb-16" {...fadeInUp}>
          <Card className="border-0 shadow-xl dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-3xl font-medium flex items-center space-x-3">
                <Briefcase className="h-8 w-8 text-purple-500" />
                <span>Professional Journey</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative pt-8">
              <div className="absolute left-8 top-0 h-full w-1 bg-gradient-to-b from-blue-400 to-purple-500 opacity-20 dark:opacity-30" />
              {(experience.length > 0
                ? experience
                : [
                    {
                      title: "Senior Full Stack Developer",
                      company: "TechCorp Inc.",
                      period: "2020 - Present",
                      responsibilities: [
                        "Led development of high-traffic e-commerce platform",
                        "Implemented microservices architecture",
                        "Mentored junior developers",
                      ],
                    },
                    {
                      title: "Full Stack Developer",
                      company: "WebSolutions Co.",
                      period: "2018 - 2020",
                      responsibilities: [
                        "Developed client websites",
                        "Improved site performance",
                        "Collaborated with design team",
                      ],
                    },
                  ]
              ).map((job, index) => (
                <motion.div key={index} className="relative pl-16 pb-8 group" whileHover={{ x: 10 }}>
                  <div className="absolute left-8 top-2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 shadow-md" />
                  <div className="p-6 bg-white dark:bg-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-medium mb-2">{job.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {job.company} • {job.period}
                    </p>
                    <ul className="space-y-2">
                      {(job.responsibilities || []).map((resp, i) => (
                        <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                          <ChevronRight className="h-5 w-5 text-purple-500 mr-2" />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.section>

        {/* Projects Showcase */}
        <motion.section {...fadeInUp}>
          <Card className="border-0 shadow-xl dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-3xl font-medium flex items-center space-x-3">
                <Folder className="h-8 w-8 text-blue-500" />
                <span>Featured Projects</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
              {(projects.length > 0
                ? projects
                : [
                    {
                      name: "E-commerce Platform",
                      description: "Scalable online shopping solution",
                      tech: ["React", "Node.js", "MongoDB"],
                    },
                    {
                      name: "AI Chatbot",
                      description: "Conversational NLP agent",
                      tech: ["Python", "TensorFlow", "AWS"],
                    },
                    {
                      name: "Fitness App",
                      description: "Cross-platform health tracker",
                      tech: ["React Native", "Firebase", "GraphQL"],
                    },
                  ]
              ).map((project, index) => (
                <motion.div
                  whileHover={{ y: -5 }}
                  key={index}
                  className="bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-2">{project.name || project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {(project.tech || project.stack || []).map((tech, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-blue-500 dark:text-blue-400 border-blue-200 dark:border-blue-900"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 w-full" />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  )
}

