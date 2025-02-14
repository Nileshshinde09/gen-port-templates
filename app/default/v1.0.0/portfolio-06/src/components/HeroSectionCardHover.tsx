import { HoverEffect } from "./ui/card-hover-effect";

const HeroSectionCardHoverEffect = () => {
  return (
    <div className="max-w-6xl mx-auto px-8">
      <HoverEffect className="text-center" items={projects} />
    </div>
  );
};
export default HeroSectionCardHoverEffect;
export const projects = [
  {
    title: "Stripe",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    link: "https://netflix.com",
  },
  {
    title: "Google",

    link: "https://google.com",
  },
  {
    title: "Meta",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    link: "https://amazon.com",
  },
  {
    title: "Microsoft",
    link: "https://microsoft.com",
  },
  {
    title: "Microsoft",
    link: "https://microsoft.com",
  },
  {
    title: "Microsoft",
    link: "https://microsoft.com",
  },
];
