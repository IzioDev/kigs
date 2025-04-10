import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { FC } from "react";
import { Link } from "react-router";

type ModuleCardProps = {
  index: number;
  title: string;
  description: string;
  path: string;
};

export const ModuleCard: FC<ModuleCardProps> = (props) => {
  return (
    <Link
      className="w-11/12 md:w-64 select-none flex box-content justify-center no-underline after:box-content before:box-content"
      to={`/modules/${props.path}`}
    >
      <div className="flex w-full flex-col rounded-md border-white border py-4 px-4 hover:shadow-sm hover:shadow-secondary hover:cursor-pointer transition-shadow">
        <p className="font-rubik text-center text-lg uppercase font-bold underline-offset-4 underline">
          {props.index + 1}. {props.title}
        </p>
        <p className="flex-1 mt-4 text-center">{props.description}</p>

        <button className="sm:hidden justify-center items-center flex w-fit self-end mt-4">
          <p>START</p>
          <ChevronDoubleRightIcon className="size-5 ml-2" />
        </button>
      </div>
    </Link>
  );
};
