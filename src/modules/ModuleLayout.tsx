import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { FC, useMemo } from "react";
import {
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";

export const ModuleLayout: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const moduleName = useMemo(() => {
    return location.pathname
      .split("/")
      .pop()
      ?.toUpperCase()
      ?.replaceAll("-", " ");
  }, [location]);

  return (
    <div className="w-100 h-screen select-none relative">
      <Link className="no-underline" to="/">
        <ArrowLongLeftIcon className="text-white size-12 md:size-16 absolute top-0 md:top-2  left-6 md:left-52 hover:text-secondary hover:cursor-pointer transition-colors" />
      </Link>
      <h3 className="font-rubik inline absolute top-2 md:top-6 text-xl left-24 md:left-72">
        {moduleName ?? ""}
      </h3>
      <div className="pt-12 py-16 md:pt-20 w-100 border-t border-white">
        <Outlet />
      </div>
    </div>
  );
};
