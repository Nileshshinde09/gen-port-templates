import { HomeHeader } from "@/components";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { NavUp } from "@/store/slices/themeSlice";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useAppDispatch();
  const isNavVisible = useAppSelector((state) => state.theme.isNavVisible);
  useEffect(() => {
    if (isNavVisible) return;
    dispatch(NavUp());
  }, []);
  return (
    <HomeLayout className="w-full h-full overflow-y-auto">
      <HomeHeader />
    </HomeLayout>
  );
};

export const HomeLayout = ({
  children,
  outerClassName,
  gardientClassName,
  className,
}: {
  children: React.ReactNode;
  outerClassName?: string;
  gardientClassName?: string;
  className?: string;
}): React.ReactNode => (
  <div
    className={cn(
      "min-h-screen h-[200%] overflow-hidden w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative",
      outerClassName
    )}
  >
    <div
      className={cn(
        "absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
        gardientClassName
      )}
    />
    <div className={cn("absolute z-40", className)}>{children}</div>
  </div>
);

export default Home;
