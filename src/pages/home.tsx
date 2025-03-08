import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Briefcase, Lock, Mail, MapPin, Moon, Sun } from "lucide-react";
import { Portfolio } from "@/services";
import { Button } from "@/components/ui/button";
import { VITE_PORTFOLIO_ACCESS_TOKEN } from "@/constants";

// Define interfaces for type safety
interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  currentlyStudying: boolean;
  _id: string;
}

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
  _id: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  socials: string[];
  repositoryLink: string;
  liveDemoLink: string;
  _id: string;
}

interface PortfolioData {
  email: string;
  avatar: string | null;
  designation: string;
  location: string;
  fullName: string;
  bio: string;
  skills: string[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
}

// Props interface for the Home component

// Default data for development/testing


// Helper function to format dates
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [designation, setDesignation] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isUnauthorized, setIsUnauthorized] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      try {
        const response = await Portfolio.getPublicPortfolio(
          "default-portfolio-01",
          VITE_PORTFOLIO_ACCESS_TOKEN
        );
        
        if (response.status === 200 && response.data.data?.portfolio) {
          const data = response.data.data.portfolio;
          setEmail(data.visibleFields.email===1?  data.user.email : null);
          setAvatar(data.visibleFields.avatar===1? data.user.avatar : null);
          setDesignation(data.visibleFields.designation===1? data.user.designation : null);
          setLocation(data.visibleFields.location===1? data.user.location : null);
          setFullName(data.visibleFields.fullName===1? data.user.fullName : null);
          setBio(data.visibleFields.bio===1? data.user.bio : null);
          setSkills(data.visibleFields.skills===1? data.user.skills : []);
          setEducation(data.visibleFields.education===1? data.user.education : []);
          setExperience(data.visibleFields.experience===1? data.user.experience : []);
          setProjects(data.visibleFields.projects===1? data.user.projects : []);
        }
        else if(response.status === 401){
        setIsUnauthorized(true);
        
        }
         else {
          setError(true);
        }
      } catch (err) {
        setError(true);
        console.error('Error fetching portfolio:', err);
        setIsUnauthorized(true);
      }
    })();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const hoverEffect = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  };


  if(isUnauthorized){
    return (<div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center text-center">
          <Lock className="h-16 w-16 text-red-500" />
          <h1 className="mt-4 text-2xl font-bold text-gray-800">Access Denied</h1>
          <p className="mt-2 text-gray-600">
            You don't have permission to view this page. Please contact your administrator if you believe this is a mistake.
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
    </div>)
  }
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 transition-colors duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
      <motion.div
        className="container mx-auto max-w-5xl px-4"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        {/* Dark Mode Toggle */}
        <motion.div className="flex justify-end mb-4" variants={fadeInUp}>
          <Switch
            checked={darkMode}
            onCheckedChange={() => {
              setDarkMode(!darkMode);
              document.documentElement.classList.toggle("dark");
            }}
            className="mr-2"
          />
          {darkMode ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </motion.div>

        {/* Header Section */}
        <motion.header className="text-center mb-12" variants={fadeInUp}>
          {(avatar || fullName) && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring" }}
            >
              <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-gray-900 dark:border-gray-100">
                <AvatarImage
                  src={avatar || "/placeholder.svg"}
                  alt={fullName || ""}
                />
                <AvatarFallback className="bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900">
                  {fullName?.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
            </motion.div>
          )}
          {fullName && (
            <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
              {fullName}
            </h1>
          )}
          {designation && (
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              {designation}
            </p>
          )}
          {(location || email) && (
            <div className="flex justify-center space-x-4 text-gray-600 dark:text-gray-300">
              {location && (
                <motion.div
                  className="flex items-center"
                  whileHover={{ y: -2 }}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{location}</span>
                </motion.div>
              )}
              {email && (
                <motion.div
                  className="flex items-center"
                  whileHover={{ y: -2 }}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  <span>{email}</span>
                </motion.div>
              )}
            </div>
          )}
        </motion.header>

        {/* About Section */}
        {bio && (
          <motion.section className="mb-12" variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              About Me
            </h2>
            <motion.div whileHover={hoverEffect}>
              <Card className="bg-gray-50 dark:bg-gray-800">
                <CardContent className="pt-6">
                  <p className="text-gray-600 dark:text-gray-300">{bio}</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.section>
        )}

        {/* Experience Section */}
        {experience?.length > 0 && (
          <motion.section className="mb-12" variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Experience
            </h2>
            <motion.div whileHover={hoverEffect}>
              <Card className="bg-gray-50 dark:bg-gray-800">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {experience.map((exp) => (
                      <motion.div
                        key={exp._id}
                        className="flex"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="flex flex-col items-center mr-4">
                          <motion.div
                            className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-900 dark:border-gray-100"
                            whileHover={{ scale: 1.1 }}
                          >
                            <Briefcase className="h-5 w-5 text-gray-900 dark:text-gray-100" />
                          </motion.div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {exp.position}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {exp.company} | {formatDate(exp.startDate)} -{" "}
                            {exp.currentlyWorking
                              ? "Present"
                              : formatDate(exp.endDate)}
                          </p>
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            {exp.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.section>
        )}

        {/* Education Section */}
        {education?.length > 0 && (
          <motion.section className="mb-12" variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Education
            </h2>
            <motion.div whileHover={hoverEffect}>
              <Card className="bg-gray-50 dark:bg-gray-800">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {education.map((edu) => (
                      <motion.div
                        key={edu._id}
                        className="flex"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="flex flex-col items-center mr-4">
                          <motion.div
                            className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-900 dark:border-gray-100"
                            whileHover={{ scale: 1.1 }}
                          >
                            <svg
                              className="h-5 w-5 text-gray-900 dark:text-gray-100"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 14l9-5-9-5-9 5 9 5z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 14l9-5-9-5-9 5 9 5z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 14v7"
                              />
                            </svg>
                          </motion.div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {edu.degree} in {edu.fieldOfStudy}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {edu.institution}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {formatDate(edu.startDate)} -{" "}
                            {edu.currentlyStudying
                              ? "Present"
                              : formatDate(edu.endDate)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.section>
        )}

        {/* Skills Section */}
        {skills?.length > 0 && (
          <motion.section className="mb-12" variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Skills
            </h2>
            <motion.div whileHover={hoverEffect}>
              <Card className="bg-gray-50 dark:bg-gray-800">
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        variants={fadeInUp}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Badge
                          variant="outline"
                          className="bg-white dark:bg-gray-700"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.section>
        )}

        {/* Projects Section */}
        {projects?.length > 0 && (
          <motion.section variants={fadeInUp}>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Projects
            </h2>
            <div className="space-y-6">
              {projects.map((project) => (
                <motion.div key={project._id} whileHover={hoverEffect}>
                  <Card className="bg-gray-50 dark:bg-gray-800">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-gray-100">
                        {project.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="bg-white dark:bg-gray-700"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex space-x-4">
                          <a
                            href={project.repositoryLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            GitHub Repository
                          </a>
                          <a
                            href={project.liveDemoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Live Demo
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </motion.div>
    </div>
  );
}
