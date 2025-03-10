import { useEffect, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Briefcase,
  GraduationCap,
  Mail,
  MapPin,
  Moon,
  Sun,
  Code,
  Folder,
  ChevronRight,
  Lock,
} from "lucide-react";
import { VITE_PORTFOLIO_ACCESS_TOKEN } from "@/constants";
import { Portfolio } from "@/services";
import { Button } from "@/components/ui/button";

export default function Home({ portfolio }: { portfolio?: any }) {
  const [darkMode, setDarkMode] = useState(false);
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
  const [profileData, setProfileData] = useState<any>();
  const [error, setError] = useState<boolean>(false);
  const [isUnauthorized, setIsUnauthorized] = useState<boolean>(false);
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
  useEffect(() => {
    (async () => {
      try {
        const response = await Portfolio.getPublicPortfolio(
          "default-portfolio-07",
          VITE_PORTFOLIO_ACCESS_TOKEN
        );

        if (response.status === 200 && response.data.data?.portfolio) {
          const data = response.data.data.portfolio;
          setProfileData(data?.user);
          setVisibleFields(data.visibleFields);
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };
  if (profileData)
    return (
      <div
        className={` min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-neutral-950 dark:to-neutral-950 transition-colors duration-300 ${
          darkMode ? "dark" : ""
        }`}
      >
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <motion.div className="flex justify-end mb-4" {...fadeInUp}>
            <Switch
              checked={darkMode}
              onCheckedChange={toggleDarkMode}
              className="mr-2"
            />
            {darkMode ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </motion.div>

          <motion.header className="text-center mb-12" {...fadeInUp}>
            {visibleFields.avatar !== 0 && (
              <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary">
                <AvatarImage
                  src={profileData.avatar || "/placeholder.svg"}
                  alt={profileData.fullName}
                />
                <AvatarFallback>
                  {profileData?.fullName
                    ?.split(" ")
                    .map((n:any) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            )}
            {visibleFields.fullName !== 0 && (
              <h1 className="text-3xl font-medium mb-2">
                {profileData.fullName}
              </h1>
            )}
            {visibleFields.designation !== 0 && (
              <p className="text-lg text-muted-foreground mb-4">
                {profileData.designation}
              </p>
            )}
            <div className="flex justify-center space-x-4 text-muted-foreground">
              {visibleFields.location !== 0 && (
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{profileData.location}</span>
                </div>
              )}
              {visibleFields.email !== 0 && (
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>{profileData.email}</span>
                </div>
              )}
              {/* {visibleFields.&&<div className="flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              <span>{profileData.phone}</span>
            </div>} */}
            </div>
          </motion.header>

          {visibleFields.skills !== 0 && (
            <motion.section className="mb-12" {...fadeInUp}>
              <Card className="overflow-hidden">
                <CardHeader className="bg-primary text-primary-foreground">
                  <CardTitle className="text-xl font-medium flex items-center">
                    <Code className="mr-2 h-6 w-6" /> Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-2">
                    {profileData?.skills?.map((skill:string, index:number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-sm py-1 px-3"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          )}

          {visibleFields.experience !== 0 && (
            <motion.section className="mb-12" {...fadeInUp}>
              <Card className="overflow-hidden">
                <CardHeader className="bg-primary text-primary-foreground">
                  <CardTitle className="text-xl font-medium flex items-center">
                    <Briefcase className="mr-2 h-6 w-6" /> Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {profileData?.experience?.map((exp:any, index:number) => (
                      <div key={index} className="relative pl-8 pb-8">
                        <div className="absolute left-0 top-0 h-full w-0.5 bg-primary"></div>
                        <div className="absolute left-0 -ml-[6.5px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                        <h3 className="text-lg font-serif">{exp.position}</h3>
                        <p className="text-sm text-muted-foreground">
                          {exp.company} |{" "}
                          {new Date(exp.startDate)?.getFullYear()} -{" "}
                          {exp.currentlyWorking
                            ? "Present"
                            : new Date(exp.endDate)?.getFullYear()}
                        </p>
                        <div className="mt-2">
                          <div className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-primary shrink-0 mr-2" />
                            <span>{exp.description}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          )}

          {visibleFields.education !== 0 && (
            <motion.section className="mb-12" {...fadeInUp}>
              <Card className="overflow-hidden">
                <CardHeader className="bg-primary text-primary-foreground">
                  <CardTitle className="text-xl font-medium flex items-center">
                    <GraduationCap className="mr-2 h-6 w-6" /> Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {profileData?.education?.map((edu:any, index:number) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-primary mr-4"></div>
                        <div>
                          <h3 className="font-serif text-lg">{edu.degree}</h3>
                          <p className="text-sm text-muted-foreground">
                            {edu.institution},{" "}
                            {new Date(edu.startDate)?.getFullYear()} -{" "}
                            {edu.currentlyStudying
                              ? "Present"
                              : new Date(edu.endDate)?.getFullYear()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          )}

          {visibleFields.projects !== 0 && (
            <motion.section {...fadeInUp}>
              <Card className="overflow-hidden">
                <CardHeader className="bg-primary text-primary-foreground">
                  <CardTitle className="text-xl font-medium flex items-center">
                    <Folder className="mr-2 h-6 w-6" /> Projects
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <Tabs defaultValue="project1" className="w-full">
                    <TabsList
                      className="grid w-full"
                      style={{
                        gridTemplateColumns: `repeat(${profileData?.projects?.length}, 1fr)`,
                      }}
                    >
                      {profileData?.projects?.map((project:any, index:number) => (
                        <TabsTrigger key={index} value={`project${index + 1}`}>
                          {project.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {profileData?.projects?.map((project:any, index:number) => (
                      <TabsContent key={index} value={`project${index + 1}`}>
                        <Card>
                          <CardHeader>
                            <CardTitle>{project.name}</CardTitle>
                            <CardDescription>
                              {project.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project?.technologies?.map((tech:any, i:number) => (
                                <Badge key={i} variant="secondary">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                            <p className="flex items-start">
                              <ChevronRight className="h-5 w-5 text-primary shrink-0 mr-2" />
                              <a
                                href={project.repositoryLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                Repository Link
                              </a>
                            </p>
                            {project.liveDemoLink && (
                              <p className="flex items-start">
                                <ChevronRight className="h-5 w-5 text-primary shrink-0 mr-2" />
                                <a
                                  href={project.liveDemoLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline"
                                >
                                  Live Demo
                                </a>
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </motion.section>
          )}
        </div>
      </div>
    );
}
