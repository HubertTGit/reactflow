// // ui/customInputHandle.test.tsx
// import React from "react";
// import { render, screen } from "@testing-library/react";
// import { CustomInputHandle } from "./customInputHandle";
// import { ReactFlowProvider } from "@xyflow/react";

// describe("CustomInputHandle", () => {
//   it("renders correctly", async () => {
//     const props = {
//       id: "test-id",
//       onChangeInfo: jest.fn(),
//       xPos: 100,
//     };

//     const { container } = render(
//       <ReactFlowProvider>
//         <CustomInputHandle {...props} />
//       </ReactFlowProvider>,
//     );

//     expect(container).toBeInTheDocument();
//   });

//   it("Handle should not be connectable and therefore there is no onChangeInfo", () => {
//     const props = {
//       id: "test-id",
//       onChangeInfo: jest.fn(),
//       xPos: 100,
//     };
//     const { container } = render(
//       <ReactFlowProvider>
//         <CustomInputHandle {...props} />
//       </ReactFlowProvider>,
//     );
//     expect(container).toBeInTheDocument();
//   });
// });
