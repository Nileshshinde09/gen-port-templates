
import { useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Briefcase, Mail, Code, GraduationCap } from "lucide-react"

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ${darkMode ? "dark" : ""}`}>
      <div className="container mx-auto max-w-3xl px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <Code className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            <span className="text-lg font-medium text-gray-900 dark:text-gray-100">John Doe</span>
          </motion.div>
          <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
        </div>

        {/* Profile Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-16"
        >
          <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-white dark:border-gray-800 shadow-lg">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-3xl">
              JD
            </AvatarFallback>
          </Avatar>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">John Doe</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">Full Stack Developer</p>
          <div className="flex justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition-colors"
              href="mailto:john.doe@example.com"
            >
              <Mail className="h-5 w-5" />
              Contact Me
            </motion.a>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS'].map((skill, i) => (
              <Badge 
                key={i}
                variant="outline"
                className="py-3 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Experience</h2>
          <div className="space-y-8">
            <Card className="border border-gray-200 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Briefcase className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <CardTitle className="text-lg">Senior Developer</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tech Corp • 2020 - Present</p>
                </div>
              </CardHeader>
              <CardContent className="text-gray-600 dark:text-gray-300">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Led team in developing enterprise applications</li>
                  <li>Implemented modern web architecture</li>
                  <li>Mentored junior developers</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Briefcase className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <CardTitle className="text-lg">Web Developer</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Digital Solutions • 2018 - 2020</p>
                </div>
              </CardHeader>
              <CardContent className="text-gray-600 dark:text-gray-300">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Developed client-facing web applications</li>
                  <li>Optimized application performance</li>
                  <li>Collaborated with design teams</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Education</h2>
          <Card className="border border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <GraduationCap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <div>
                <CardTitle className="text-lg">Computer Science</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">Stanford University • 2016 - 2020</p>
              </div>
            </CardHeader>
          </Card>
        </motion.section>
      </div>
    </div>
  )
}