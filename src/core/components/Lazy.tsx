import React, { FC, Suspense } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

export const Lazy: FC<{
  component: () => Promise<{ default: React.ComponentType }>;
}> = ({ component }) => {
  const Component = React.lazy(component);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component />
    </Suspense>
  );
};
