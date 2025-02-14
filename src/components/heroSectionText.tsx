import BoxReveal from "./ui/box-reveal";
import { Utils } from "@/lib/utils";
import { EarthLockIcon } from "lucide-react";
// import Menue from "./menubar";
interface BoxRevealHeroSectionProps {
  className?: string;
}
const BoxRevealHeroSection: React.FC<BoxRevealHeroSectionProps> = ({
  className,
}): React.ReactNode => {
  return (
    <div
      className={Utils.cn(
        "size-full max-w-lg items-center justify-center overflow-hidden pt-1",
        className
      )}
    >
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <p className="text-[5rem] font-semibold flex items-center">
          <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/30">
            SAuth
          </span>
          <EarthLockIcon className=" w-[5rem] h-[5rem] text-[#8f89e6]" />
        </p>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <h2 className="mt-[.5rem] text-[2rem] text-gray-200">
          UI library for{" "}
          <span className="text-[#8f89e6]">Design Engineers</span>
        </h2>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <div className="mt-6 text-[1.2rem] text-gray-200">
          <p>
            -&gt; 20+ free and open-source animated components built with
            <span className="font-semibold text-[#8f89e6]"> React</span>,
            <span className="font-semibold text-[#8f89e6]"> Typescript</span>,
            <span className="font-semibold text-[#8f89e6]"> Tailwind CSS</span>,
            and
            <span className="font-semibold text-[#8f89e6]"> Framer Motion</span>
            . <br />
            -&gt; 100% open-source, and customizable. <br />
          </p>
        </div>
      </BoxReveal>


    </div>
  );
};
export default BoxRevealHeroSection;
