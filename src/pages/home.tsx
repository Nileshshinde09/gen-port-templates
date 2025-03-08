import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Mail, Moon, Sun, Code, Terminal, Linkedin, Github, Lock } from "lucide-react"
import { Portfolio } from "@/services"
import { VITE_PORTFOLIO_ACCESS_TOKEN } from "@/constants"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const { scrollY } = useScroll()

  const y = useTransform(scrollY, [0, 500], [0, 100])
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
        const response = await Portfolio.getPublicPortfolio("default-portfolio-02", VITE_PORTFOLIO_ACCESS_TOKEN)

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

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "backOut" },
    },
  }

  return (
    <div
      className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 ${darkMode ? "dark" : ""}`}
    >
      <motion.div
        className="fixed inset-0 bg-gradient-to-b from-blue-100/50 to-gray-50/50 dark:from-gray-900/50 dark:to-blue-900/10"
        style={{ y }}
      />

      <div className="container mx-auto max-w-6xl px-4 py-8 relative">
        {/* Header */}
        <motion.header
          className="flex justify-between items-center mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-4">
            <Terminal className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {fullName ? `${fullName.split(" ")[0].toLowerCase()}.dev` : "johndoe.dev"}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm">
              <Sun className="h-5 w-5 text-amber-500" />
              <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
              <Moon className="h-5 w-5 text-slate-400" />
            </div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <motion.section
          className="flex flex-col lg:flex-row items-center gap-12 mb-28"
          initial="hidden"
          animate="visible"
          variants={staggerVariants}
        >
          <motion.div className="lg:order-2" variants={itemVariants}>
            <Avatar className="w-64 h-64 border-4 border-white dark:border-gray-800 shadow-xl">
              <AvatarImage src={avatar || "/placeholder.svg"} alt={fullName || "Profile"} />
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-slate-600 text-white text-4xl font-bold">
                {fullName
                  ? fullName
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                  : "JD"}
              </AvatarFallback>
            </Avatar>
          </motion.div>

          <motion.div className="lg:order-1 space-y-6" variants={itemVariants}>
            <motion.h1
              className="text-5xl md:text-6xl font-bold leading-tight"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {designation ? designation.split(" ")[0] : "Senior"}
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-slate-300">
                {designation ? designation.split(" ").slice(1).join(" ") : "Software Engineer"}
              </span>
            </motion.h1>

            <motion.div
              className="flex space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md"
                href={email ? `mailto:${email}` : "#"}
              >
                <Mail className="h-5 w-5" />
                <span>Contact Me</span>
              </motion.a>

              <div className="flex space-x-4">
                <motion.a whileHover={{ y: -2 }} className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <Linkedin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </motion.a>
                <motion.a whileHover={{ y: -2 }} className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <Github className="h-6 w-6 text-gray-800 dark:text-gray-200" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Skills Section */}
        <motion.section className="mb-28" initial="hidden" animate="visible" variants={sectionVariants}>
          <motion.h2 className="text-4xl font-bold mb-12 text-gray-800 dark:text-gray-200" variants={itemVariants}>
            Technical Expertise
          </motion.h2>

          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4" variants={staggerVariants}>
            {(skills.length > 0
              ? skills
              : ["React", "TypeScript", "Node.js", "GraphQL", "AWS", "Docker", "Python", "PostgreSQL"]
            ).map((skill, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
              >
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{skill}</h3>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Experience Section */}
        <motion.section className="mb-28" initial="hidden" animate="visible" variants={sectionVariants}>
          <motion.h2 className="text-4xl font-bold mb-12 text-gray-800 dark:text-gray-200" variants={itemVariants}>
            Professional Experience
          </motion.h2>

          <motion.div className="space-y-8" variants={staggerVariants}>
            {(experience.length > 0
              ? experience
              : [
                  {
                    title: "Lead Software Engineer",
                    company: "TechCorp",
                    period: "2020 - Present",
                    description: "Leading cross-functional teams in developing enterprise-scale applications",
                    tech: ["React", "Node.js", "AWS", "GraphQL"],
                  },
                  {
                    title: "Senior Full Stack Developer",
                    company: "Digital Solutions",
                    period: "2018 - 2020",
                    description: "Developed cloud-native applications for Fortune 500 clients",
                    tech: ["Angular", "Python", "Docker", "Kubernetes"],
                  },
                ]
            ).map((exp, i) => (
              <motion.div key={i} variants={itemVariants} className="relative pl-8">
                <div className="absolute left-0 top-6 h-3 w-3 bg-blue-600 rounded-full" />
                <Card className="bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <CardTitle className="text-2xl mb-2">{exp.title}</CardTitle>
                        <p className="text-gray-600 dark:text-gray-400 font-medium">
                          {exp.company} • {exp.period}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(exp.tech || []).map((t, j) => (
                          <Badge key={j} className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">{exp.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Projects Section */}
        <motion.section className="mb-28" initial="hidden" animate="visible" variants={sectionVariants}>
          <motion.h2 className="text-4xl font-bold mb-12 text-gray-800 dark:text-gray-200" variants={itemVariants}>
            Key Projects
          </motion.h2>

          <motion.div className="grid md:grid-cols-2 gap-8" variants={staggerVariants}>
            {(projects.length > 0
              ? projects
              : [
                  {
                    title: "Enterprise SaaS Platform",
                    description: "Scalable B2B solution with real-time analytics",
                    stack: ["React", "Node.js", "PostgreSQL", "AWS"],
                  },
                  {
                    title: "AI-Powered Analytics Suite",
                    description: "Machine learning-driven business insights platform",
                    stack: ["Python", "TensorFlow", "Kubernetes", "BigQuery"],
                  },
                ]
            ).map((project, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {(project.stack || []).map((tech, j) => (
                      <Badge
                        key={j}
                        variant="outline"
                        className="border-blue-200 dark:border-blue-900/30 text-blue-600 dark:text-blue-400"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
}

