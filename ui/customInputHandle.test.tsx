import React from "react";
import { render } from "@testing-library/react";
import { CustomInputHandle } from "./customInputHandle";
import { ReactFlowProvider } from "@xyflow/react";

describe("CustomInputHandle", () => {
  it("renders correctly", async () => {
    const props = {
      id: "test-id",
      nodeId: "test-node-id",
      onChangeInfo: jest.fn(),
      xPos: 100,
    };

    const { container } = render(
      <ReactFlowProvider>
        <CustomInputHandle {...props} />
      </ReactFlowProvider>,
    );

    expect(container).toBeInTheDocument();
  });
});
