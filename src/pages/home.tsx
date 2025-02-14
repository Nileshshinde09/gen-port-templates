

import { useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, GraduationCap, Mail, MapPin, Moon, Phone, Sun, Code, Folder, ChevronRight } from "lucide-react"

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)

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
      className={` min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-neutral-950 dark:to-neutral-950 transition-colors duration-300 ${darkMode ? "dark" : ""}`}
    >
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <motion.div className="flex justify-end mb-4" {...fadeInUp}>
          <Switch checked={darkMode} onCheckedChange={toggleDarkMode} className="mr-2" />
          {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </motion.div>

        <motion.header className="text-center mb-12" {...fadeInUp}>
          <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary">
            <AvatarImage src="/placeholder.svg" alt="John Doe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-medium mb-2">John Doe</h1>
          <p className="text-lg text-muted-foreground mb-4">Full Stack Developer</p>
          <div className="flex justify-center space-x-4 text-muted-foreground">
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span>New York, NY</span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              <span>john.doe@example.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
        </motion.header>

        <motion.section className="mb-12" {...fadeInUp}>
          <Card className="overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="text-xl font-medium flex items-center">
                <Code className="mr-2 h-6 w-6" /> Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2">
                {["JavaScript", "TypeScript", "React", "Node.js", "Python", "SQL", "Git", "AWS", "Docker"].map(
                  (skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                      {skill}
                    </Badge>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section className="mb-12" {...fadeInUp}>
          <Card className="overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="text-xl font-medium flex items-center">
                <Briefcase className="mr-2 h-6 w-6" /> Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {[
                  {
                    title: "Senior Full Stack Developer",
                    company: "TechCorp Inc.",
                    period: "2020 - Present",
                    responsibilities: [
                      "Led the development of a high-traffic e-commerce platform",
                      "Implemented microservices architecture to improve scalability",
                      "Mentored junior developers and conducted code reviews",
                    ],
                  },
                  {
                    title: "Full Stack Developer",
                    company: "WebSolutions Co.",
                    period: "2018 - 2020",
                    responsibilities: [
                      "Developed and maintained multiple client websites",
                      "Implemented responsive designs and improved site performance",
                      "Collaborated with design team to create intuitive user interfaces",
                    ],
                  },
                ].map((job, index) => (
                  <div key={index} className="relative pl-8 pb-8">
                    <div className="absolute left-0 top-0 h-full w-0.5 bg-primary"></div>
                    <div className="absolute left-0 -ml-[6.5px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                    <h3 className="text-lg font-serif">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {job.company} | {job.period}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {job.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start">
                          <ChevronRight className="h-5 w-5 text-primary shrink-0 mr-2" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section className="mb-12" {...fadeInUp}>
          <Card className="overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="text-xl font-medium flex items-center">
                <GraduationCap className="mr-2 h-6 w-6" /> Education
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[
                  {
                    degree: "Master of Computer Science",
                    school: "Stanford University",
                    period: "2018-2020",
                  },
                  {
                    degree: "Bachelor of Science in Computer Engineering",
                    school: "MIT",
                    period: "2014-2018",
                  },
                ].map((edu, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-primary mr-4"></div>
                    <div>
                      <h3 className="font-serif text-lg">{edu.degree}</h3>
                      <p className="text-sm text-muted-foreground">
                        {edu.school}, {edu.period}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section {...fadeInUp}>
          <Card className="overflow-hidden">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="text-xl font-medium flex items-center">
                <Folder className="mr-2 h-6 w-6" /> Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="project1" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="project1">E-commerce Platform</TabsTrigger>
                  <TabsTrigger value="project2">AI Chatbot</TabsTrigger>
                  <TabsTrigger value="project3">Fitness App</TabsTrigger>
                </TabsList>
                {[
                  {
                    name: "E-commerce Platform",
                    description: "Full-stack online shopping solution",
                    details: [
                      "Developed a scalable e-commerce platform using React, Node.js, and MongoDB.",
                      "Key features: user authentication, product catalog, shopping cart, and payment integration.",
                    ],
                  },
                  {
                    name: "AI-powered Chatbot",
                    description: "Intelligent conversational agent",
                    details: [
                      "Created a chatbot using natural language processing techniques and machine learning algorithms.",
                      "Implemented intent recognition, entity extraction, and context management for human-like interactions.",
                    ],
                  },
                  {
                    name: "Mobile Fitness App",
                    description: "Cross-platform health tracking solution",
                    details: [
                      "Built a cross-platform mobile app for fitness tracking using React Native and Firebase.",
                      "Features include workout planning, progress tracking, and social sharing capabilities.",
                    ],
                  },
                ].map((project, index) => (
                  <TabsContent key={index} value={`project${index + 1}`}>
                    <Card>
                      <CardHeader>
                        <CardTitle>{project.name}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {project.details.map((detail, i) => (
                          <p key={i} className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-primary shrink-0 mr-2" />
                            <span>{detail}</span>
                          </p>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  )
}
