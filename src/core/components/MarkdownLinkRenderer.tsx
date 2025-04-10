import { FC } from "react";

export const MarkdownLinkRenderer: FC<{
  href?: string;
  children?: React.ReactNode;
}> = (props) => {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
};
