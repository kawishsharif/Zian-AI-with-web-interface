import { useNavigate } from "react-router-dom";
import Header from "./header";
import SideBar from "./sidebar";
import { ReactNode, useEffect, useState } from "react";
import useAuthUserStore from "@/lib/zustand/authUserStore";
import LoadingSparkle from "./LoadingSparkle";

type Props = {
  children?: ReactNode;
  heading?: string;
  description?: string;
  secure?: boolean;
  sidebar?: boolean;
};

export default function MainLayout({
  children,
  heading = "",
  description,
  secure = true,
  sidebar = true,
}: Props) {
  const [menuExpanded, setMenuExpanded] = useState(false);
  const { authUser } = useAuthUserStore();
  const [showPage, setShowPage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!secure && !authUser) return setShowPage(true);
    if (!secure && authUser) return navigate("/", { replace: true })
    if (secure && !authUser) return navigate("/login", { replace: true });
    if (authUser) return setShowPage(true);
    return navigate("/login", { replace: true });
    // api.user
    //   .getProfile()
    //   .then((profile) => {
    //     if (!profile && secure) return navigate("/login");
    //     setAuthUser(profile);
    //     setShowPage(true);
    //     if (profile && !secure) return navigate("/");
    //   })
    //   .catch((error) => {
    //     if (secure) navigate("/login");
    //   });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser, secure]);


  return !showPage ? (
    <div className="flex w-full h-screen items-center justify-center">
      <LoadingSparkle spark variant="large" />
    </div>
  ) : (
    <div className="w-full flex gap-5">
      {secure && sidebar && <SideBar expanded={menuExpanded} />}
      <div className="flex flex-col w-full max-w-full overflow-x-hidden min-h-screen overflow-y-auto px-2 xs:px-4 lg:px-5 bg-gr-purple lg:bg-none max-h-[calc(100vh_-_10px)] ">
        {secure && sidebar && (
          <Header
            heading={heading}
            description={description}
            menuExpanded={menuExpanded}
            onToggleMenu={() => setMenuExpanded(!menuExpanded)}
          />
        )}
        <div className="xl:hidden mb-4 text-center lg:text-start">
          <h2 className="text-[32px] leading-9 text-white font-nebula">
            {heading}
          </h2>
          {description && (
            <p className="text-base font-jakarta">{description}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
