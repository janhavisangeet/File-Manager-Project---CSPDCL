import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { LogoIcon } from "./Icons";
import { Link } from "react-router-dom";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  { href: "#features", label: "Features" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#services", label: "Services" },
  { href: "#faq", label: "FAQ" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between">
          <NavigationMenuItem className="font-bold flex">
            <Link to="/" className="ml-2 font-bold text-xl flex">
              <LogoIcon />
              CSPDCL
            </Link>
          </NavigationMenuItem>

          {/* Mobile Menu */}
          <span className="flex md:hidden">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu className="flex md:hidden h-5 w-5" />
              </SheetTrigger>

              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    Shadcn/React
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }) => (
                    <a
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </a>
                  ))}
                  {/* Mobile Login & Signup Links */}
                  <div className="flex gap-2">
                    <Link
                      to="/auth/login"
                      className={`w-[100px] border ${buttonVariants({
                        variant: "secondary",
                      })}`}
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/auth/register"
                      className={`w-[100px] border ${buttonVariants({
                        variant: "default",
                      })}`}
                      onClick={() => setIsOpen(false)}
                    >
                      Signup
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-2">
            {routeList.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop Login & Signup Buttons */}
          <div className="hidden md:flex gap-2">
            <Link
              to="/auth/login"
              className={`border ${buttonVariants({ variant: "default" })}`}
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              className={`border ${buttonVariants({ variant: "default" })}`}
            >
              Signup
            </Link>
            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default Navbar;
