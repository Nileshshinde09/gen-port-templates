"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Briefcase, Mail, MapPin, Moon, Sun, Code, Folder, Phone, Lock, GraduationCap } from "lucide-react"
import { Portfolio } from "@/services"
import { VITE_PORTFOLIO_ACCESS_TOKEN } from "@/constants"
import { BoxIcon as Button } from "lucide-react"

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [error, setError] = useState<boolean>(false)
  const [isUnauthorized, setIsUnauthorized] = useState<boolean>(false)
  const [profileData, setProfileData] = useState<any>(null)
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
    phone: -1,
  })

  useEffect(() => {
    ;(async () => {
      try {
        const response = await Portfolio.getPublicPortfolio("default-portfolio-02", VITE_PORTFOLIO_ACCESS_TOKEN)

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

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
          {visibleFields.avatar !== 0 && (
            <div className="relative inline-block">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur opacity-30 dark:opacity-50" />
              <Avatar className="w-40 h-40 mx-auto border-4 border-white dark:border-gray-800 shadow-2xl relative">
                <AvatarImage src={profileData?.avatar || "/placeholder.svg"} alt={profileData?.fullName} />
                <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-500 text-white text-3xl font-medium">
                  {profileData?.fullName
                    ?.split(" ")
                    .map((n:any ) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
          {visibleFields.fullName !== 0 && (
            <h1 className="text-5xl font-medium mb-4 mt-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              {profileData?.fullName}
            </h1>
          )}
          {visibleFields.designation !== 0 && (
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 font-medium">{profileData?.designation}</p>
          )}
          <div className="flex justify-center space-x-6 flex-wrap gap-4">
            {visibleFields.location !== 0 && (
              <motion.a
                whileHover={{ y: -2 }}
                className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <MapPin className="mr-2 h-5 w-5 text-blue-500" />
                <span className="text-gray-700 dark:text-gray-300">{profileData?.location}</span>
              </motion.a>
            )}
            {visibleFields.email !== 0 && (
              <motion.a
                whileHover={{ y: -2 }}
                className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <Mail className="mr-2 h-5 w-5 text-purple-500" />
                <span className="text-gray-700 dark:text-gray-300">{profileData?.email}</span>
              </motion.a>
            )}
            {visibleFields.phone !== 0 && profileData?.phone && (
              <motion.a
                whileHover={{ y: -2 }}
                className="flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <Phone className="mr-2 h-5 w-5 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">{profileData?.phone}</span>
              </motion.a>
            )}
          </div>
        </motion.header>

        {/* Skills Grid */}
        {visibleFields.skills !== 0 && (
          <motion.section className="mb-16" {...fadeInUp}>
            <Card className="border-0 shadow-xl dark:bg-gray-800">
              <CardHeader className="pb-0">
                <CardTitle className="text-3xl font-medium flex items-center space-x-3">
                  <Code className="h-8 w-8 text-blue-500" />
                  <span>Technical Expertise</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6">
                {profileData?.skills?.map((skill: any, index: number) => (
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
        )}

        {/* Experience Timeline */}
        {visibleFields.experience !== 0 && (
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
                {profileData?.experience?.map((job: any, index: number) => (
                  <motion.div key={index} className="relative pl-16 pb-8 group" whileHover={{ x: 10 }}>
                    <div className="absolute left-8 top-2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 shadow-md" />
                    <div className="p-6 bg-white dark:bg-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                      <h3 className="text-xl font-medium mb-2">{job.position}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        {job.company} • {new Date(job.startDate).getFullYear()} -{" "}
                        {job.currentlyWorking ? "Present" : new Date(job.endDate).getFullYear()}
                      </p>
                      <div className="text-gray-600 dark:text-gray-300">{job.description}</div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.section>
        )}

        {/* Education Section */}
        {visibleFields.education !== 0 && (
          <motion.section className="mb-16" {...fadeInUp}>
            <Card className="border-0 shadow-xl dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-3xl font-medium flex items-center space-x-3">
                  <GraduationCap className="h-8 w-8 text-blue-500" />
                  <span>Educational Background</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative pt-8">
                <div className="absolute left-8 top-0 h-full w-1 bg-gradient-to-b from-purple-400 to-blue-500 opacity-20 dark:opacity-30" />
                {profileData?.education?.map((edu: any, index: number) => (
                  <motion.div key={index} className="relative pl-16 pb-8 group" whileHover={{ x: 10 }}>
                    <div className="absolute left-8 top-2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 shadow-md" />
                    <div className="p-6 bg-white dark:bg-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                      <h3 className="text-xl font-medium mb-2">
                        {edu.degree} in {edu.fieldOfStudy}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        {edu.institution} • {new Date(edu.startDate).getFullYear()} -{" "}
                        {edu.currentlyStudying ? "Present" : new Date(edu.endDate).getFullYear()}
                      </p>
                      {edu.currentlyStudying && (
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          Currently Studying
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.section>
        )}

        {/* Projects Showcase */}
        {visibleFields.projects !== 0 && (
          <motion.section {...fadeInUp}>
            <Card className="border-0 shadow-xl dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-3xl font-medium flex items-center space-x-3">
                  <Folder className="h-8 w-8 text-blue-500" />
                  <span>Featured Projects</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
                {profileData?.projects?.map((project: any, index: number) => (
                  <motion.div
                    whileHover={{ y: -5 }}
                    key={index}
                    className="bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-medium mb-2">{project.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech: any, i: number) => (
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
        )}
      </div>
    </div>
  )
}

