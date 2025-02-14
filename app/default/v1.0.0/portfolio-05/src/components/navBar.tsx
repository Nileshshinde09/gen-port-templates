import { Flower, Sun, Moon } from "lucide-react";
import { Utils } from "@/lib/utils";
import { Button } from "./ui/button";
import { useTheme } from "./ui/theme-provider";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useId, useState } from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { ResumeLink } from "@/constants";
const _NavigationMenu = () => {
  const isNavVisible = useAppSelector((state) => state.theme.isNavVisible);
  const id = useId();
  const [checked, setChecked] = useState<boolean>(true);
  const { theme,setTheme } = useTheme();
  useEffect(() => {
    if (theme === "light") {
      setChecked(true);
    }
  },[]);

  if (!isNavVisible) return;
const handleMode=(state:boolean)=>{
  if(state){
    setChecked(true)
    setTheme("dark")
  }else{
    setChecked(false)
    setTheme("light")
  }
}
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute max-sm:pr-5  right-6 z-[1000] flex justify-end w-full max-w-5xl mt-5 left-1/2 -translate-x-1/2 "
    >
      <div className="flex gap-4 items-center">
      <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "tween", stiffness: 300 }}
        >
          <Button variant={"link"} className="text-base">
            <a href={ResumeLink}>
            Resume
            </a>
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "tween", stiffness: 300 }}
        >
          <div className="inline-flex items-center gap-2">
            <Switch
              id={id}
              checked={checked}
              onCheckedChange={handleMode}
              aria-label="Toggle switch"
            />
            <Label htmlFor={id}>
              <span className="sr-only">Toggle switch</span>
              {theme === "light" ? (
                <Sun size={16} strokeWidth={2} aria-hidden="true" />
              ) : (
                <Moon size={16} strokeWidth={2} aria-hidden="true" />
              )}
            </Label>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default _NavigationMenu;
export const Icon = () => (
  <img
    src={"/icon.svg"}
    className="border-zinc-700/80 shadow-inner bg-black shadow-zinc-500/80 border-4 p-2 rounded-full"
  />
);

export const Toolkit = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className={Utils.cn(
            "py-3 w-[20rem]",
            theme === "dark" ? "dark" : null
          )}
        >
          <div className="flex gap-3">
            <Flower
              className="mt-0.5 shrink-0 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            <div className="space-y-1">
              <p className="text-[13px] font-medium">Guest Account Button</p>
              <p className="text-xs text-muted">
                A button for guest users to explore the platform with limited
                trial features, offering a quick and seamless experience without
                requiring a full account setup.
              </p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
