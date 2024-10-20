//TODO: useFormStatus cause runtime error in test
// // ui/dialogComponent.test.tsx
// import React from "react";
// import { render, fireEvent } from "@testing-library/react";
// import DialogComponent from "./dialogComponent";
// import { INodeTypeEnum, IPayload } from "@/utils/interface";
// import { Node, ReactFlowProvider } from "@xyflow/react";
// import { useFormStatus } from "react-dom";

// jest.mock("@/utils/interface", () => ({
//   INodeTypeEnum: {
//     input: "input",
//     output: "output",
//     mixer: "mixer",
//   },
// }));

// //mocke redis
// jest.mock("@upstash/redis", () => ({
//   Redis: jest.fn(),
// }));

// //jest.mock("react-dom", () => ({ useFormStatus: jest.fn() }));

// describe("DialogComponent", () => {
//   const nodes: Node[] = [
//     {
//       id: "a508b5d4-b754-4a73-b318-4ea23c029303",
//       type: "inputNode",
//       position: {
//         x: 601.5,
//         y: 175.5,
//       },
//       data: {
//         label: "Yellow",
//         color: "#fbff00",
//       },
//       measured: {
//         width: 60,
//         height: 40,
//       },
//       selected: false,
//       dragging: false,
//     },
//   ];
//   const closeModalHandler = jest.fn();
//   const payload: IPayload = {
//     id: "node-1",
//     type: INodeTypeEnum.input,
//     isEdit: false,
//     position: {
//       x: 0,
//       y: 0,
//     },
//     label: "input",
//   };

//   it("renders dialog with correct class names", () => {
//     const { getByRole } = render(
//       <ReactFlowProvider>
//         <DialogComponent
//           payload={payload}
//           nodes={nodes}
//           closeModalHandler={closeModalHandler}
//         />
//       </ReactFlowProvider>,
//     );
//     const dialog = getByRole("dialog");
//     expect(dialog).toHaveClass(
//       "min-w-20 rounded-lg border-2 bg-white p-3 backdrop:bg-black/25 backdrop:backdrop-blur-sm",
//     );
//     expect(dialog).toHaveClass("border-green-600");
//   });
// });
