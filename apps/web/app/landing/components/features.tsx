export const Features = () => {
  return (
    <>
      <div className="mb-2 max-w-lg flex flex-col text-wrap text-center text-3xl font-medium text-shadow-lg">
        Features
      </div>
      <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto text-center">
        <Feature
          heading="Freehand & Shapes"
          subtext="Draw freely with your mouse, or drop in rectangles, circles, and arrows."
        />
        <Feature
          heading="Lightweight & Distraction-Free"
          subtext="Skip the clutter. Freeflow keeps your focus on ideas, not menus."
        />
        <Feature
          heading="Save & Revisit Anytime"
          subtext="Your boards are always there when you need them."
        />
      </div>
    </>
  );
};

const Feature = ({
  heading,
  subtext,
}: {
  heading: string;
  subtext: string;
}) => {
  return (
    <div>
      <h3 className="text-xl md:text-2xl font-semibold text-shadow-md">
        {heading}
      </h3>
      <p className="mt-2 text-white/80">{subtext}</p>
    </div>
  );
};
