import { FC } from "react";
import Markdown from "react-markdown";
import { MarkdownLinkRenderer } from "../components/MarkdownLinkRenderer";
import { MarkdownLiquidTag } from "../components/MarkdownLiquidTag";
import reactLiquidTag from "remark-react-liquid-tag";

export const MarkdownDisplay: FC<{ input: string }> = ({ input }) => {
  return (
    <Markdown
      components={{ a: MarkdownLinkRenderer }}
      remarkPlugins={[[reactLiquidTag, { component: MarkdownLiquidTag }]]}
      remarkRehypeOptions={{ allowDangerousHtml: true }}
    >
      {input}
    </Markdown>
  );
};
