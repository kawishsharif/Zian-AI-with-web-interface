import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faFile, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { cn } from "../lib/utils";
import { GrSeperator } from "./ui/seperator";
import { Link, useLocation, useNavigate } from "react-router-dom";
import EditProfilePopup from "./popups/EditProfilePopup";
import CustomizePopup from "./popups/CustomizePopup";
import BillingPopup from "./popups/BillingPopup";
import { useCookies } from "react-cookie";
import axios from "axios";

type Props = {
  expanded?: boolean;
};

export default function SideBar({ expanded = false }: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, __, removeCookie] = useCookies(["authToken"]);

  const handleLogout = () => {
    removeCookie("authToken");
    axios.defaults.headers.common.Authorization = null;
    navigate("/login", { replace: true });
    window.location.reload();
  };
  return (
    <div
      className={cn(
        "min-w-[280px] w-full lg:max-w-[400px] xl:max-w-[300px] min-h-screen pt-5 xl:pt-32 md:pt-16 pb-10",
        "flex flex-col gap-20 lg:gap-10 justify-between z-50 px-6 lg:pl-0",
        "fixed top-0 -left-full xl:static bg-[#1E162E] xl:bg-transparent",
        "max-h-screen overflow-y-auto transition-all",
        expanded && "left-0"
      )}
    >
      <div className="w-full">
        <a href="/">
          <img
            src="/images/avatar.png"
            width={120}
            height={120}
            loading="lazy"
            className={cn(
              "w-[120px] h-auto aspect-square rounded-full overflow-hidden mx-auto",
              "hidden xl:block"
            )}
            alt=""
          />
        </a>
        <div className="mt-16 md:mt-4 w-full">
          <div className="py-3">
            {/* <UserHeaderComponent expandable className="lg:hidden" toggleClassName="h-[71px]" /> */}
            {/* <UserDropdownMenu className="h-[71px] md:hidden" /> */}
          </div>
          <NavigationItem
            href="/"
            active={pathname === "/"}
            text="Home"
            icon={<FontAwesomeIcon icon={faHome} />}
          />
          <GrSeperator className="mt-6 mb-2" />
          <CustomizePopup />
          <NavigationItem
            href="/wordpress"
            active={pathname === "/wordpress"}
            className="my-0.5"
            text="Integrate API"
            icon={<FontAwesomeIcon icon={faFile} />}
          />
          <GrSeperator className="my-2" />
          <EditProfilePopup />
          <BillingPopup />
          <GrSeperator className="my-2" />
          <NavigationItem
            active={pathname === "/logout"}
            onClick={handleLogout}
            className="my-0.5"
            text="Log out"
            icon={<FontAwesomeIcon icon={faSignOut} />}
          />
        </div>
      </div>
    </div>
  );
}

type NavigationItemProps = {
  text: string;
  href?: string;
  icon: React.ReactNode;
  active?: boolean;
  className?: string;
  onClick?: () => void;
};

export function NavigationItem({
  text,
  className,
  icon,
  onClick,
  active = false,
  href = "#",
}: NavigationItemProps) {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        "font-bold text-sm transition-all duration-300 rounded-full lg:rounded-none lg:rounded-r-full",
        "inline-flex gap-3 items-center py-5 px-12 w-full",
        active ? "shadow-navigation-item" : "hover:shadow-navigation-item",
        active ? "text-primary" : "text-white hover:text-primary",
        active ? "bg-white" : "bg-transparent hover:bg-white",
        className
      )}
    >
      {icon}
      {text}
    </Link>
  );
}
