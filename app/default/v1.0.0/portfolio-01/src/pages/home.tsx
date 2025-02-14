import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Mail, MapPin, Moon, Phone, Sun } from "lucide-react"

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

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const hoverEffect = {
    hover: { scale: 1.02, transition: { duration: 0.2 } }
  }

  const tabContentVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 transition-colors duration-300 ${darkMode ? "dark" : ""}`}
    >
      <motion.div
        className="container mx-auto max-w-5xl px-4"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        <motion.div className="flex justify-end mb-4" variants={fadeInUp}>
          <Switch checked={darkMode} onCheckedChange={toggleDarkMode} className="mr-2" />
          {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </motion.div>

        <motion.header className="text-center mb-12" variants={fadeInUp}>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring" }}>
            <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-gray-900 dark:border-gray-100">
              <AvatarImage src="/placeholder.svg" alt="John Doe" />
              <AvatarFallback className="bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900">
                JD
              </AvatarFallback>
            </Avatar>
          </motion.div>
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">John Doe</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">Full Stack Developer</p>
          <div className="flex justify-center space-x-4 text-gray-600 dark:text-gray-300">
            {[
              { icon: <MapPin className="mr-2 h-4 w-4" />, text: "New York, NY" },
              { icon: <Mail className="mr-2 h-4 w-4" />, text: "john.doe@example.com" },
              { icon: <Phone className="mr-2 h-4 w-4" />, text: "+1 (555) 123-4567" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="flex items-center"
                whileHover={{ y: -2 }}
              >
                {item.icon}
                <span>{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.header>

        {/* About Section */}
        <motion.section className="mb-12" variants={fadeInUp}>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">About Me</h2>
          <motion.div whileHover={hoverEffect}>
            <Card className="bg-gray-50 dark:bg-gray-800">
              <CardContent className="pt-6">
                <p className="text-gray-600 dark:text-gray-300">
                  Passionate full-stack developer with 5+ years of experience in building scalable web applications.
                  Proficient in JavaScript, React, Node.js, and cloud technologies. Always eager to learn and apply new
                  technologies to solve complex problems.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        {/* Experience Section */}
        <motion.section className="mb-12" variants={fadeInUp}>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Experience</h2>
          <motion.div whileHover={hoverEffect}>
            <Card className="bg-gray-50 dark:bg-gray-800">
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
                    <motion.div 
                      key={index} 
                      className="flex"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex flex-col items-center mr-4">
                        <motion.div
                          className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-900 dark:border-gray-100"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Briefcase className="h-5 w-5 text-gray-900 dark:text-gray-100" />
                        </motion.div>
                        {index !== 1 && <div className="w-px h-full bg-gray-300 dark:bg-gray-600"></div>}
                      </div>
                      <div className={index !== 1 ? "pb-6" : ""}>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{job.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {job.company} | {job.period}
                        </p>
                        <ul className="mt-2 list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                          {job.responsibilities.map((resp, i) => (
                            <motion.li 
                              key={i}
                              whileHover={{ x: 5 }}
                            >
                              {resp}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        {/* Skills Section */}
        <motion.section className="mb-12" variants={fadeInUp}>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Skills</h2>
          <motion.div whileHover={hoverEffect}>
            <Card className="bg-gray-50 dark:bg-gray-800">
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2">
                  {["JavaScript", "TypeScript", "React", "Node.js", "Python", "SQL", "Git", "AWS", "Docker"].map(
                    (skill, index) => (
                      <motion.div 
                        key={index} 
                        variants={fadeInUp}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Badge variant="outline" className="bg-white dark:bg-gray-700">
                          {skill}
                        </Badge>
                      </motion.div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        {/* Projects Section */}
        <motion.section variants={fadeInUp}>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Projects</h2>
          <motion.div whileHover={hoverEffect}>
            <Card className="bg-gray-50 dark:bg-gray-800">
              <CardContent className="pt-6">
                <Tabs defaultValue="project1">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-700">
                    {["E-commerce Platform", "AI Chatbot", "Fitness App"].map((tab, index) => (
                      <TabsTrigger 
                        key={index} 
                        value={`project${index + 1}`}
                        className="data-[state=active]:bg-gray-900 data-[state=active]:text-gray-100 dark:data-[state=active]:bg-gray-100 dark:data-[state=active]:text-gray-900"
                      >
                        {tab}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <AnimatePresence mode="wait">
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
                        <motion.div
                          variants={tabContentVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                        >
                          <Card className="mt-4 bg-gray-100 dark:bg-gray-700">
                            <CardHeader>
                              <CardTitle className="text-gray-900 dark:text-gray-100">
                                {project.name}
                              </CardTitle>
                              <CardDescription className="text-gray-600 dark:text-gray-300">
                                {project.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2 text-gray-600 dark:text-gray-300">
                              {project.details.map((detail, i) => (
                                <p key={i}>{detail}</p>
                              ))}
                            </CardContent>
                          </Card>
                        </motion.div>
                      </TabsContent>
                    ))}
                  </AnimatePresence>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>
      </motion.div>
    </div>
  )
}