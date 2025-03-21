

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Briefcase,
  Mail,
  Code,
  GraduationCap,
  Rocket,
  Terminal,
  Lock,
} from "lucide-react";
import { Portfolio } from "@/services";
import { VITE_PORTFOLIO_ACCESS_TOKEN } from "@/constants";
import { Button } from "@/components/ui/button";

export default function PortfolioPage({ portfolio }: { portfolio?: any }) {
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState<boolean>(false)
  const [isUnauthorized, setIsUnauthorized] = useState<boolean>(false)
  
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
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
  });
  const [profileData, setProfileData] = useState<any>({});

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
  useEffect(() => {
    ;(async () => {
      try {
        const response = await Portfolio.getPublicPortfolio("default-portfolio-02", VITE_PORTFOLIO_ACCESS_TOKEN)
  
        if (response.status === 200 && response.data.data?.portfolio) {
          const data = response.data.data.portfolio
          setProfileData(data?.user);
          setVisibleFields(data.visibleFields);
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
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-900 transition-colors duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
      <motion.div
        className="fixed top-0 left-0 w-full h-2 bg-slate-700 dark:bg-slate-600 z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* Header - Updated with dynamic name */}
        <motion.header
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {visibleFields.fullName !== 0 && (
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Terminal className="h-6 w-6 text-slate-700 dark:text-slate-300" />
              <span className="text-lg font-medium text-slate-800 dark:text-slate-200">
                {profileData?.fullName}
              </span>
            </motion.div>
          )}
          <motion.div whileHover={{ rotate: 15 }}>
            <Switch
              checked={darkMode}
              onCheckedChange={toggleDarkMode}
              className="data-[state=checked]:bg-white"
            />
          </motion.div>
        </motion.header>

        {/* Profile Section - Updated with dynamic data */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-16 relative"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-slate-200 to-gray-200 dark:from-slate-800 dark:to-gray-800 blur-3xl opacity-10 -z-10"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          {visibleFields.avatar !== 0 && (
            <motion.div
              className="inline-block mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Avatar className="w-32 h-32 mx-auto border-4 border-slate-200 dark:border-slate-700 shadow-2xl">
                <AvatarImage src={profileData.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-r from-slate-700 to-gray-800 text-white text-3xl">
                  {profileData.fullName
                    ?.split(" ")
                    ?.map((n:any) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </motion.div>
          )}
          {visibleFields.fullName !== 0 && (
            <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              {profileData.fullName}
            </h1>
          )}
          {visibleFields.designation !== 0 && (
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-2">
              {profileData.designation}
            </p>
          )}
          {visibleFields.location !== 0 && (
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              {profileData.location} • {profileData.bio}
            </p>
          )}

          {/* Contact buttons */}
          {visibleFields.email !== 0 && (
            <div className="flex justify-center gap-4 mb-6">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 dark:bg-slate-700 text-white rounded-xl shadow-lg font-medium hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
                href={`mailto:${profileData.email}`}
              >
                <Mail className="h-5 w-5" />
                Email Me
              </motion.a>
              {/* <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl shadow-lg font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              href={`tel:${profileData.phone}`}
            >
              <Phone className="h-5 w-5" />
              Call Me
            </motion.a> */}
            </div>
          )}
        </motion.section>

        {/* Skills Section */}
        {visibleFields.skills !== 0 && (
          <motion.section
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="mb-16"
          >
            <motion.h2
              className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-8 text-center"
              variants={fadeIn}
            >
              Technical Expertise
            </motion.h2>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
              variants={staggerChildren}
            >
              {profileData?.skills?.map((skill:any, i:number) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  whileHover={{ y: -5 }}
                  className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Code className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {skill}
                    </span>
                  </div>
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
            variants={staggerChildren}
            className="mb-16"
          >
            <motion.h2
              className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-8 text-center"
              variants={fadeIn}
            >
              Professional Journey
            </motion.h2>
            <div className="space-y-8 relative">
              <div className="absolute left-6 top-0 h-full w-1 bg-gradient-to-b from-slate-400 to-slate-600 opacity-20 dark:opacity-30" />
              {profileData?.experience?.map((exp:any, i:number) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className="relative pl-12 group"
                  whileHover={{ x: 10 }}
                >
                  <div className="absolute left-6 top-4 w-3 h-3 rounded-full bg-slate-600" />
                  <Card className="bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700">
                    <CardHeader className="flex flex-col md:flex-row md:items-center gap-4 pb-2">
                      <Briefcase className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                      <div>
                        <CardTitle className="text-lg">
                          {exp.position}
                        </CardTitle>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {exp.company} • {exp.startDate?.split("T")[0]} -{" "}
                          {exp.endDate?.split("T")[0]}
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent className="text-slate-600 dark:text-slate-300">
                      <ul className="list-disc pl-6 space-y-2">
                        {exp.description.split("\n").map((detail:any, j:number) => (
                          <motion.li
                            key={j}
                            className="flex items-center gap-2"
                            whileHover={{ x: 5 }}
                          >
                            <Rocket className="h-4 w-4 text-slate-500" />
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
        )}

        {/* Projects Section */}
        {visibleFields.projects !== 0 && (
          <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="mb-16"
        >
          <motion.h2
            className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-8 text-left"
            variants={fadeIn}
          >
            Featured Projects
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {profileData?.projects?.map((project:any, i:number) => (
              <motion.div
                key={i}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-950 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
              >
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                  {project.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech:any, j:number) => (
                    <span
                      key={j}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.repositoryLink}
                    className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-slate-100 transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.liveDemoLink}
                    className="text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-slate-100 transition-colors"
                  >
                    Live Demo
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        )}

        {/* Education Section */}
        {visibleFields.education !== 0 && (
          <motion.section
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="mb-16"
          >
            <motion.h2
              className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-8 text-center"
              variants={fadeIn}
            >
              Education
            </motion.h2>
            <motion.div
              className="bg-gradient-to-r from-slate-700 to-gray-800 p-1 rounded-2xl"
              variants={fadeIn}
            >
              <Card className="bg-white dark:bg-slate-800 rounded-xl">
                <CardHeader className="flex items-start flex-wrap gap-4 pb-2">
                  {profileData?.education?.map((edu:any, index:number) => (
                    <div key={index} className="">
                      <GraduationCap className="h-8 w-8 text-slate-500" />
                      <div >
                        <CardTitle className="text-lg">{edu.degree}</CardTitle>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {edu.institution},{" "}
                          {new Date(edu.startDate)?.getFullYear()} -{" "}
                          {edu.currentlyStudying
                            ? "Present"
                            : new Date(edu.endDate)?.getFullYear()}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardHeader>
              </Card>
            </motion.div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
