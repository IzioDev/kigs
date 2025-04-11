import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/solid";
import { FC, useMemo } from "react";
import { modules } from "./module";
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

  const currentIndex = modules.findIndex((module) =>
    location.pathname.endsWith(module.path)
  );

  const handleNavigate = (direction: "prev" | "next") => {
    const targetIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex >= 0 && targetIndex < modules.length) {
      navigate(`/modules/${modules[targetIndex].path}`);
    }
  };

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < modules.length - 1;

  const nextTitle = hasNext ? modules[currentIndex + 1].title : null;
  const prevTitle = hasPrev ? modules[currentIndex - 1].title : null;

  return (
    <div className="w-100 h-screen select-none relative">
      <Link className="no-underline" to="/">
        <ArrowLongLeftIcon className="text-white size-12 md:size-16 absolute top-0 md:top-2 left-6 md:left-52 hover:text-secondary hover:cursor-pointer transition-colors" />
      </Link>

      <h3 className="font-rubik inline absolute top-2 md:top-6 text-xl left-24 md:left-72">
        {moduleName ?? ""}
      </h3>

      <div className="pt-12 py-16 md:pt-20 w-full border-t border-white">
        <Outlet />

        <div className="mt-16 max-w-2xl mx-auto px-4 flex justify-between items-center">

          {/* Previous */}
          {hasPrev ? (
            <div className="flex flex-col items-start">
              <button
                onClick={() => handleNavigate("prev")}
                className="flex items-center px-4 py-2 border border-white rounded-md hover:shadow-secondary hover:shadow-sm transition-shadow"
              >
                <ArrowLongLeftIcon className="size-5 mr-2" />
                Previous
              </button>
              <span className="text-sm mt-2 text-white/60">{prevTitle}</span>
            </div>
          ) : <div />}

          {/* Next */}
          {hasNext && (
            <div className="flex flex-col items-end">
              <button
                onClick={() => handleNavigate("next")}
                className="flex items-center px-4 py-2 border border-white rounded-md hover:shadow-secondary hover:shadow-sm transition-shadow"
              >
                Next
                <ArrowLongRightIcon className="size-5 ml-2" />
              </button>
              <span className="text-sm mt-2 text-white/60">{nextTitle}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
