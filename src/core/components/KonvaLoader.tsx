// import { FC, useEffect, useRef } from "react";
// import { Stage, Layer, Circle } from "react-konva";
// import { CanvasDimensions } from "../../modules/type";
// import Konva from "konva";

// export const KonvaLoader: FC<{ canvasDimension: CanvasDimensions }> = ({
//   canvasDimension,
// }) => {
//   const circleRef1 = useRef<Konva.Circle | null>(null);
//   const circleRef2 = useRef<Konva.Circle | null>(null);
//   const circleRef3 = useRef<Konva.Circle | null>(null);

//   useEffect(() => {
//     const amplitude = 40;
//     const period = 1000; // in milliseconds

//     const anim = new Konva.Animation((frame) => {
//       circleRef1?.current?.y(
//         amplitude * Math.sin(((frame?.time ?? 0) * 2.06 * Math.PI) / period) +
//           canvasDimension.midY
//       );
//       circleRef2?.current?.y(
//         amplitude * Math.sin(((frame?.time ?? 0) * 2.03 * Math.PI) / period) +
//           canvasDimension.midY
//       );
//       circleRef3?.current?.y(
//         amplitude * Math.sin(((frame?.time ?? 0) * 2.09 * Math.PI) / period) +
//           canvasDimension.midY
//       );
//     }, circleRef1?.current?.getLayer());

//     anim.start();

//     return () => {
//       anim.stop();
//     };
//   }, [circleRef1, circleRef2, circleRef3]);

//   return (
//     <Stage
//       width={canvasDimension.rect.width}
//       height={canvasDimension.rect.height}
//     >
//       <Layer>
//         <Circle
//           ref={circleRef1}
//           x={canvasDimension.midX - 30}
//           y={canvasDimension.midY}
//           stroke="white"
//           radius={10}
//         ></Circle>
//         <Circle
//           ref={circleRef2}
//           x={canvasDimension.midX - 60}
//           y={canvasDimension.midY}
//           stroke="white"
//           radius={10}
//         ></Circle>
//         <Circle
//           ref={circleRef3}
//           x={canvasDimension.midX - 0}
//           y={canvasDimension.midY}
//           stroke="white"
//           radius={10}
//         ></Circle>
//       </Layer>
//     </Stage>
//   );
// };
