import { Cpu, School, Smile } from "lucide-react";
import AnimatedShinyText from "../ui/animated-shiny-text";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  FullName,
  Image,
  ContactDetails as ContactDetailsList,
  Objective,
  Education as EducationDetails,
  SoftSkills as SoftSkillsDetails,
  TechnicalSkills as TechnicalSkillsDetails,
} from "@/constants";
// import { FiSlack } from "react-icons/fi";
const HomeHeader = () => {
  return (
    <motion.div
      className="h-fit relative max-w-4xl mx-auto py-20 max-sm:px-2 flex flex-col space-y-14"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Profile />
      <ContactDetails />
      <Education />
      <TechnicalSkills />
      <SoftSkills />
      <motion.footer className="sm:absolute bottom-2 sm:left-1/2 sm:-translate-x-1/2 max-sm:text-center">
        <p className="text-sm text-muted-foreground">
          © 2025 {FullName}. All rights reserved.
        </p>
      </motion.footer>
    </motion.div>
  );
};

export default HomeHeader;

export const Education = () => {
  return (
    <>
      <motion.div
        className="sm:flex h-fit my-12 mb-2 gap-5"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className=" flex items-center gap-2 self-start">
          <motion.div
            className={cn(
              "h-12 w-12 flex items-center justify-center  group rounded-full border-4 shadow-inner hover:shadow-none shadow-neutral-400 dark:shadow-neutral-900 border-black/5 bg-neutral-950 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-zinc-300 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out text-white hover:text-neutral-900 hover:duration-300 hover:dark:text-neutral-400">
              <School className="text-neutral-500" />
            </AnimatedShinyText>
          </motion.div>
          <p className="text-xl text-muted-foreground font-medium">Education</p>
        </div>

        <div className="w-full flex flex-col space-y-5 max-sm:space-y-10 h-fit mt-14">
          {EducationDetails.map((educ, idx) => (
            <div key={idx}>
              <motion.div className="relative text-xl dark:text-muted-foreground font-mono">
                {educ.course_or_degree_name}

                <p className="dark:text-white/90 text-black/90 font-mono">
                  {educ.intitution_Name}
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "tween", stiffness: 300 }}
                  className="sm:absolute right-0 top-0 "
                >
                  <span className=" dark:text-muted-foreground/80">
                    {`${educ.starting_date}-${educ.Ending_date}`}
                  </span>
                </motion.div>
              </motion.div>
              <p className="dark:text-white/90 text-black/90 font-mono">{`${educ.grading_system} : ${educ.grads}`}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export const TechnicalSkills = () => {
  return (
    <>
      <motion.div
        className="sm:flex h-fit my-12 mb-2 gap-5"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex items-center gap-2 self-start">
          <motion.div
            className={cn(
              "h-12 w-12 flex items-center justify-center  group rounded-full border-4 shadow-inner hover:shadow-none shadow-neutral-400 dark:shadow-neutral-900 border-black/5 bg-neutral-950 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-zinc-300 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out text-white hover:text-neutral-900 hover:duration-300 hover:dark:text-neutral-400">
              <Cpu className="text-neutral-500" />
            </AnimatedShinyText>
          </motion.div>
          <p className="text-xl text-muted-foreground font-medium w-20">
            Technical Skills
          </p>
        </div>

        <div className="w-full grid grid-cols-2 gap-4  h-fit mt-14">
          {TechnicalSkillsDetails.map((skill, idx) => (
            <div key={idx}>
              <motion.div className="relative text-xl dark:text-muted-foreground font-mono">
                {skill.name}
              </motion.div>
              <p className="dark:text-white/90 text-black/90 font-mono">
                {`Proficiency : ${skill.proficiency}`}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export const SoftSkills = () => {
  return (
    <>
      <motion.div
        className="sm:flex h-fit my-12 mb-2 gap-5"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex items-center gap-2 self-start">
          <motion.div
            className={cn(
              "h-12 w-12 flex items-center justify-center  group rounded-full border-4 shadow-inner hover:shadow-none shadow-neutral-400 dark:shadow-neutral-900 border-black/5 bg-neutral-950 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-zinc-300 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out text-white hover:text-neutral-900 hover:duration-300 hover:dark:text-neutral-400">
              <Smile className="text-neutral-500" />
            </AnimatedShinyText>
          </motion.div>
          <p className="text-xl text-muted-foreground font-medium w-20">
            Soft Skills
          </p>
        </div>

        <div className="w-full grid grid-cols-2 gap-4 h-fit mt-14">
          {SoftSkillsDetails.map((skill, idx) => (
            <div key={idx}>
              <motion.div className="relative text-xl dark:text-muted-foreground font-mono">
                {skill.name}
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};
export const ContactDetails = () => {
  return (
    <motion.div
      className="flex h-fit my-12 mb-2 mx-auto items-center justify-center max-sm:w-[90%]"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.div
        className={cn(
          "h-12 flex items-center  group rounded-full border-4 shadow-inner hover:shadow-none shadow-neutral-400 dark:shadow-neutral-900 border-black/5 bg-neutral-950 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-zinc-300 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out text-white hover:text-neutral-900 hover:duration-300 hover:dark:text-neutral-400">
          <div className="flex gap-1">
            {ContactDetailsList.map((cantact, idx) => (
              <>
                <div key={idx}>
                  <h1 className="px-1">{cantact}</h1>
                </div>
              </>
            ))}
          </div>
        </AnimatedShinyText>
      </motion.div>
    </motion.div>
  );
};

export const Profile = () => {
  return (
    <motion.div
      className="sm:flex h-fit mb-2 items-center justify-start "
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.div
        className={cn(
          "max-sm:mx-auto h-28 w-28 rounded-md flex items-center justify-center  group border-4 shadow-inner hover:shadow-none shadow-neutral-400 dark:shadow-neutral-900 border-black/5 bg-neutral-950 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-zinc-300 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img src={Image} className="h-24 w-24 rounded-sm" />
      </motion.div>
      <motion.div>
        <motion.h2
          className=" bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-4xl md:text-5xl  font-sans py-2 md:py-2 relative z-20 font-bold tracking-tight"
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="text-white ">👋</span>Hi I'am {FullName}
        </motion.h2>
        <motion.blockquote
          className="max-sm:text-center border-l-2 pl-1 italic max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-left"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {Objective}
        </motion.blockquote>
      </motion.div>
    </motion.div>
  );
};
