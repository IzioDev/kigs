import { lazy, Suspense } from "react";
import { Fragment } from "react/jsx-runtime";
import { RemarkReactLiquidTagProps } from "remark-react-liquid-tag";

export const MarkdownLiquidTag: React.FC<RemarkReactLiquidTagProps> = (
  props
) => {
  switch (props.type) {
    case "component":
      console.log("../../" + props.url);

      const tt = import("../../" + props.url).finally(console.log);

      const Test = lazy(() => import("../../" + props.url));

      return (
        <Suspense fallback={<p>Loading...</p>}>
          <Test />
        </Suspense>
      );
      break;
    case "youtube":
      return (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${props.url}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    default:
      return <Fragment />;
  }
};
