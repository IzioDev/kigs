// import { FC, useEffect, useRef } from "react";
// import { Stage, Layer, Rect, Text, Group } from "react-konva";
// import Konva from "konva";
// import { CanvasDimensions } from "../../modules/type";

// type KonvaSingleCtaProps = {
//   canvasDimension: CanvasDimensions;
//   text: string;
//   onClick?: (evt: Konva.KonvaEventObject<MouseEvent>) => void;
// };

// export const KonvaSingleCta: FC<KonvaSingleCtaProps> = ({
//   canvasDimension,
//   onClick,
//   text,
// }) => {
//   const textRef = useRef<Konva.Text | null>(null);

//   const handleCursor = (e: Konva.KonvaEventObject<MouseEvent>) => {
//     const stage = e.target.getStage();
//     if (stage) {
//       if (e.type === "mouseenter") {
//         stage.container().style.cursor = "pointer";
//       } else {
//         stage.container().style.cursor = "default";
//       }
//     }
//   };

//   useEffect(() => {
//     // center text inside CTA (rect.width/2 - textWidth / 2) + rectX
//     if (textRef?.current) {
//       const width = textRef.current.textWidth;
//       const currentX = canvasDimension.midX - 200;

//       const newPos = currentX + (100 - width / 2);
//       textRef.current.x(newPos);
//     }
//   }, [textRef]);

//   return (
//     <Group
//       onMouseEnter={handleCursor}
//       onMouseLeave={handleCursor}
//       onClick={onClick}
//     >
//       <Rect
//         x={canvasDimension.midX - 200}
//         y={canvasDimension.midY}
//         stroke="white"
//         width={200}
//         height={50}
//       ></Rect>
//       <Text
//         text={text}
//         ref={textRef}
//         fill="white"
//         fontFamily="Roboto"
//         fontSize={20}
//         x={canvasDimension.midX - 200}
//         y={canvasDimension.midY + 16}
//       ></Text>
//     </Group>
//   );
// };
