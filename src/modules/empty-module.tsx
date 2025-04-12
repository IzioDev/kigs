import { FC } from "react";

export const EmptyModule: FC = () => {
  return (
    <div className="h-full border-t border-white flex flex-row">
    <div className="flex gap-4 items-center justify-center w-2/4 h-full my-3">
      <p>To come later...</p>
    </div>
    </div>
  );
};

export default EmptyModule;
