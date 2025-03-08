// import { useEffect, useState } from "react"
// import { motion } from "framer-motion"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Switch } from "@/components/ui/switch"
// import { Briefcase, Mail, Code, GraduationCap, Lock } from "lucide-react"
// import { Portfolio } from "@/services"
// import { VITE_PORTFOLIO_ACCESS_TOKEN } from "@/constants"
// import { Button } from "@/components/ui/button"

// export default function Home() {
//   const [darkMode, setDarkMode] = useState(false)
//   const [email, setEmail] = useState<string | null>(null);
//   const [avatar, setAvatar] = useState<string | null>(null);
//   const [designation, setDesignation] = useState<string | null>(null);
//   const [location, setLocation] = useState<string | null>(null);
//   const [fullName, setFullName] = useState<string | null>(null);
//   const [bio, setBio] = useState<string | null>(null);
//   const [skills, setSkills] = useState<string[]>([]);
//   const [education, setEducation] = useState<any>([]);
//   const [experience, setExperience] = useState<any>([]);
//   const [projects, setProjects] = useState<any>([]);
//   const [error, setError] = useState<boolean>(false);
//   const [isUnauthorized, setIsUnauthorized] = useState<boolean>(false);
//   useEffect(() => {
//     (async () => {
//       try {
//         const response = await Portfolio.getPublicPortfolio(
//           "default-portfolio-03",
//           VITE_PORTFOLIO_ACCESS_TOKEN
//         );

//         if (response.status === 200 && response.data.data?.portfolio) {
//           const data = response.data.data.portfolio;
//           setEmail(data.visibleFields.email===1?  data.user.email : null);
//           setAvatar(data.visibleFields.avatar===1? data.user.avatar : null);
//           setDesignation(data.visibleFields.designation===1? data.user.designation : null);
//           setLocation(data.visibleFields.location===1? data.user.location : null);
//           setFullName(data.visibleFields.fullName===1? data.user.fullName : null);
//           setBio(data.visibleFields.bio===1? data.user.bio : null);
//           setSkills(data.visibleFields.skills===1? data.user.skills : []);
//           setEducation(data.visibleFields.education===1? data.user.education : []);
//           setExperience(data.visibleFields.experience===1? data.user.experience : []);
//           setProjects(data.visibleFields.projects===1? data.user.projects : []);
//         }
//         else if(response.status === 401){
//         setIsUnauthorized(true);

//         }
//          else {
//           setError(true);
//         }
//       } catch (err) {
//         setError(true);
//         console.error('Error fetching portfolio:', err);
//         setIsUnauthorized(true);
//       }
//     })();
//   }, []);

//   if(isUnauthorized){
//     return (<div className="flex h-screen items-center justify-center bg-gray-100">
//       <div className="max-w-md rounded-2xl bg-white p-8 shadow-lg">
//         <div className="flex flex-col items-center text-center">
//           <Lock className="h-16 w-16 text-red-500" />
//           <h1 className="mt-4 text-2xl font-bold text-gray-800">Access Denied</h1>
//           <p className="mt-2 text-gray-600">
//             You don't have permission to view this page. Please contact your administrator if you believe this is a mistake.
//           </p>
//           <div className="mt-6 flex gap-4 ">
//             <Button
//               className="rounded-xl bg-blue-500 px-6 py-3 text-white bg-neutral-950 hover:bg-neutral-800"
//               onClick={() => window.location.reload()}
//             >
//               Retry
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>)
//   }
//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode)
//     document.documentElement.classList.toggle("dark")
//   }

//   const fadeIn = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 }
//   }

//   return (
//     <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ${darkMode ? "dark" : ""}`}>
//       <div className="container mx-auto max-w-3xl px-4 py-12">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-12">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="flex items-center gap-2"
//           >
//             <Code className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
//             <span className="text-lg font-medium text-gray-900 dark:text-gray-100">John Doe</span>
//           </motion.div>
//           <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
//         </div>

//         {/* Profile Section */}
//         <motion.section
//           initial="hidden"
//           animate="visible"
//           variants={fadeIn}
//           className="text-center mb-16"
//         >
//           <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-white dark:border-gray-800 shadow-lg">
//             <AvatarImage src="/placeholder.svg" />
//             <AvatarFallback className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-3xl">
//               JD
//             </AvatarFallback>
//           </Avatar>
//           <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">John Doe</h1>
//           <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">Full Stack Developer</p>
//           <div className="flex justify-center gap-4">
//             <motion.a
//               whileHover={{ scale: 1.05 }}
//               className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition-colors"
//               href="mailto:john.doe@example.com"
//             >
//               <Mail className="h-5 w-5" />
//               Contact Me
//             </motion.a>
//           </div>
//         </motion.section>

//         {/* Skills Section */}
//         <motion.section
//           initial="hidden"
//           animate="visible"
//           variants={fadeIn}
//           className="mb-16"
//         >
//           <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Skills</h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS'].map((skill, i) => (
//               <Badge
//                 key={i}
//                 variant="outline"
//                 className="py-3 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
//               >
//                 {skill}
//               </Badge>
//             ))}
//           </div>
//         </motion.section>

//         {/* Experience Section */}
//         <motion.section
//           initial="hidden"
//           animate="visible"
//           variants={fadeIn}
//           className="mb-16"
//         >
//           <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Experience</h2>
//           <div className="space-y-8">
//             <Card className="border border-gray-200 dark:border-gray-700">
//               <CardHeader className="flex flex-row items-center gap-4 pb-2">
//                 <Briefcase className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
//                 <div>
//                   <CardTitle className="text-lg">Senior Developer</CardTitle>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">Tech Corp • 2020 - Present</p>
//                 </div>
//               </CardHeader>
//               <CardContent className="text-gray-600 dark:text-gray-300">
//                 <ul className="list-disc pl-6 space-y-2">
//                   <li>Led team in developing enterprise applications</li>
//                   <li>Implemented modern web architecture</li>
//                   <li>Mentored junior developers</li>
//                 </ul>
//               </CardContent>
//             </Card>

//             <Card className="border border-gray-200 dark:border-gray-700">
//               <CardHeader className="flex flex-row items-center gap-4 pb-2">
//                 <Briefcase className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
//                 <div>
//                   <CardTitle className="text-lg">Web Developer</CardTitle>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">Digital Solutions • 2018 - 2020</p>
//                 </div>
//               </CardHeader>
//               <CardContent className="text-gray-600 dark:text-gray-300">
//                 <ul className="list-disc pl-6 space-y-2">
//                   <li>Developed client-facing web applications</li>
//                   <li>Optimized application performance</li>
//                   <li>Collaborated with design teams</li>
//                 </ul>
//               </CardContent>
//             </Card>
//           </div>
//         </motion.section>

//         {/* Education Section */}
//         <motion.section
//           initial="hidden"
//           animate="visible"
//           variants={fadeIn}
//         >
//           <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Education</h2>
//           <Card className="border border-gray-200 dark:border-gray-700">
//             <CardHeader className="flex flex-row items-center gap-4 pb-2">
//               <GraduationCap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
//               <div>
//                 <CardTitle className="text-lg">Computer Science</CardTitle>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Stanford University • 2016 - 2020</p>
//               </div>
//             </CardHeader>
//           </Card>
//         </motion.section>
//       </div>
//     </div>
//   )
// }

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
import { Button } from "@/components/ui/button";
import { Portfolio } from "@/services";
import { VITE_PORTFOLIO_ACCESS_TOKEN } from "@/constants";

export default function PortfolioPage() {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [designation, setDesignation] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [education, setEducation] = useState<any>([]);
  const [experience, setExperience] = useState<any>([]);
  const [projects, setProjects] = useState<any>([]);
  const [error, setError] = useState<boolean>(false);
  const [isUnauthorized, setIsUnauthorized] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      try {
        const response = await Portfolio.getPublicPortfolio(
          "default-portfolio-03",
          VITE_PORTFOLIO_ACCESS_TOKEN
        );

        if (response.status === 200 && response.data.data?.portfolio) {
          const data = response.data.data.portfolio;
          setEmail(data.visibleFields.email === 1 ? data.user.email : null);
          setAvatar(data.visibleFields.avatar === 1 ? data.user.avatar : null);
          setDesignation(
            data.visibleFields.designation === 1 ? data.user.designation : null
          );
          setLocation(
            data.visibleFields.location === 1 ? data.user.location : null
          );
          setFullName(
            data.visibleFields.fullName === 1 ? data.user.fullName : null
          );
          setBio(data.visibleFields.bio === 1 ? data.user.bio : null);
          setSkills(data.visibleFields.skills === 1 ? data.user.skills : []);
          setEducation(
            data.visibleFields.education === 1 ? data.user.education : []
          );
          setExperience(
            data.visibleFields.experience === 1 ? data.user.experience : []
          );
          setProjects(
            data.visibleFields.projects === 1 ? data.user.projects : []
          );
        } else if (response.status === 401) {
          setIsUnauthorized(true);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
        console.error("Error fetching portfolio:", err);
        setIsUnauthorized(true);
      }
    })();
  }, []);

  if (isUnauthorized) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <div className="flex flex-col items-center text-center">
            <Lock className="h-16 w-16 text-red-500" />
            <h1 className="mt-4 text-2xl font-bold text-gray-800">
              Access Denied
            </h1>
            <p className="mt-2 text-gray-600">
              You don't have permission to view this page. Please contact your
              administrator if you believe this is a mistake.
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
    );
  }
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
      className={`min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
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
              {fullName || ""}
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
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="inline-block mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Avatar className="w-32 h-32 mx-auto border-4 border-white/50 dark:border-gray-800/50 shadow-2xl">
              <AvatarImage src={avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-3xl">
                {fullName
                  ? fullName
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                  : "JD"}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {fullName || ""}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {designation || ""}
          </p>
          <motion.a
            whileHover={{
              scale: 1.05,
              background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg font-medium"
            href={email ? `mailto:${email}` : "#"}
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
            {skills.length > 0&& skills.map((skill, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center gap-3">
                  <Code className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {skill}
                  </span>
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
            {experience.length > 0 &&
              experience.map((exp, i) => (
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
                          {exp.company} • {exp.startDate} -{" "}
                          {exp.endDate || "Present"}
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent className="text-gray-600 dark:text-gray-300">
                      <ul className="list-disc pl-6 space-y-2">
                        {exp.description.split("\n").map((detail, j) => (
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
          {education.length > 0 &&
            education.map((edu, i) => (
              <motion.div
                key={i}
                className="bg-gradient-to-r from-blue-500 to-purple-500 p-1 rounded-2xl mb-4"
                variants={fadeIn}
              >
                <Card className="bg-white dark:bg-gray-800 rounded-xl">
                  <CardHeader className="flex items-center gap-4 pb-2">
                    <GraduationCap className="h-8 w-8 text-purple-500" />
                    <div>
                      <CardTitle className="text-lg">{edu.degree}</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {edu.institution} • {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
        </motion.section>
      </div>
    </div>
  );
}
