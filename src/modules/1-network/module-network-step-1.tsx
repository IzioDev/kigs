import { FC } from "react";
import { Edge } from "@xyflow/react";
import { KaspaNodeCustomNode } from "../../core/components/KaspaNodeCustomNode";
import { BasicFlow } from "../../core/containers/BasicFlow";

type ModuleNetworkStep1Props = {};

const initialNodes: KaspaNodeCustomNode[] = [
  {
    id: "1",
    data: { label: "Node" },
    position: { x: 5, y: 5 },
    type: "kaspaNode",
  },
  {
    id: "2",
    data: { label: "Node" },
    position: { x: 5, y: 100 },
    type: "kaspaNode",
  },
  {
    id: "3",
    data: { label: "Node" },
    position: { x: 5, y: 100 },
    type: "kaspaNode",
  },
  {
    id: "4",
    data: { label: "Node" },
    position: { x: 5, y: 100 },
    type: "kaspaNode",
  },
  {
    id: "5",
    data: { label: "Node" },
    position: { x: 5, y: 100 },
    type: "kaspaNode",
  },
  {
    id: "6",
    data: { label: "Node" },
    position: { x: 5, y: 100 },
    type: "kaspaNode",
  },
  {
    id: "7",
    data: { label: "Node" },
    position: { x: 5, y: 100 },
    type: "kaspaNode",
  },
  {
    id: "8",
    data: { label: "Node" },
    position: { x: 5, y: 100 },
    type: "kaspaNode",
  },
  {
    id: "9",
    data: { label: "Node" },
    position: { x: 5, y: 100 },
    type: "kaspaNode",
  },
  {
    id: "10",
    data: { label: "Node" },
    position: { x: 5, y: 100 },
    type: "kaspaNode",
  },
  {
    id: "11",
    data: { label: "Node" },
    position: { x: 5, y: 100 },
    type: "kaspaNode",
  },
  {
    id: "12",
    data: { label: "Node" },
    position: { x: 5, y: 100 },
    type: "kaspaNode",
  },
  {
    id: "13",
    data: { label: "Node" },
    position: { x: 5, y: 100 },
    type: "kaspaNode",
  },
  {
    id: "14",
    data: { label: "Node" },
    position: { x: 5, y: 100 },
    type: "kaspaNode",
  },
  {
    id: "15",
    data: { label: "Node" },
    position: { x: 5, y: 100 },
    type: "kaspaNode",
  },
  {
    id: "16",
    data: { label: "Node" },
    position: { x: 5, y: 100 },
    type: "kaspaNode",
  },
  {
    id: "17",
    data: { label: "Node" },
    position: { x: 5, y: 100 },
    type: "kaspaNode",
  },
];

const initialEdges: Edge[] = [
  { id: "1", source: "1", target: "2", animated: true },
  { id: "2", source: "1", target: "3", animated: true },
  { id: "3", source: "1", target: "4", animated: true },
  { id: "4", source: "1", target: "5", animated: true },
  { id: "5", source: "1", target: "6", animated: true },
  { id: "6", source: "1", target: "7", animated: true },
  { id: "7", source: "1", target: "8", animated: true },
  { id: "8", source: "1", target: "9", animated: true },
  { id: "9", source: "10", target: "1", animated: true },
  { id: "10", source: "11", target: "1", animated: true },
  { id: "11", source: "12", target: "1", animated: true },
  { id: "12", source: "13", target: "1", animated: true },
  { id: "13", source: "14", target: "1", animated: true },
  { id: "14", source: "15", target: "1", animated: true },
  { id: "15", source: "16", target: "1", animated: true },
  { id: "16", source: "17", target: "1", animated: true },
];

export const ModuleNetworkStep1Canvas: FC<ModuleNetworkStep1Props> = () => {
  return (
    <BasicFlow
      options={{ layout: { ranksep: 110, nodesep: 60, direction: "LR" } }}
      initialEdges={initialEdges}
      initialNodes={initialNodes}
    />
  );
};
