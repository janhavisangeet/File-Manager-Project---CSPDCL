import { HeroCards } from "./HeroCards";
import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
              Chhattisgarh State Power Distribution
            </span>{" "}
            Company Limited
          </h1>{" "}
          {/* for{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              
            </span>{" "}
            developers
          </h2> */}
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias
          asperiores, repellat beatae sed natus reprehenderit assumenda harum
          qui. Excepturi, dolor! Similique dolore distinctio excepturi
          voluptates voluptatibus, ullam recusandae omnis a!
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Link
            to="/allPdfs"
            className={`w-[100px] border ${buttonVariants({
              variant: "default",
            })}`}
          >
            Display Pdfs
          </Link>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
