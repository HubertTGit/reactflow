import { addNodeAction } from "@/utils/actions";
import { Node } from "@xyflow/react";
import { INodeTypeEnum, IPayload } from "./interface";
//mocke redis
jest.mock("@upstash/redis", () => ({
  Redis: jest.fn(),
}));

//mocke db
jest.mock("@/lib/db", () => ({
  setNodes: jest.fn(),
  getNodes: jest.fn(),
  setEdges: jest.fn(),
  getEdges: jest.fn(),
}));

//mock crypto

describe("addNodeAction", () => {
  const formData = new FormData();
  const currentNodes: Node[] = [];

  afterEach(() => {
    formData.delete("label");
    formData.delete("color");
  });

  it("should throw an error if payload is null", async () => {
    await expect(addNodeAction(formData, null, currentNodes)).rejects.toThrow(
      "No payload",
    );
  });

  it("should add a new node with label and color", async () => {
    formData.append("label", "New Node");
    formData.append("color", "#ff0000");

    const payload: Partial<IPayload> = {
      type: INodeTypeEnum.input,
      position: { x: 0, y: 0 },
    };

    const result = await addNodeAction(formData, payload, currentNodes);

    expect(result).toHaveLength(currentNodes.length + 1);
    expect(result[result.length - 1].data.label).toBe("New Node");
    expect(result[result.length - 1].data.color).toBe("#ff0000");
  });

  it("should add a new mixer node with default colors and color range", async () => {
    formData.append("label", "Mixer Node");

    const payload: Partial<IPayload> = {
      type: INodeTypeEnum.mixer,
      position: { x: 0, y: 0 },
    };

    const result = await addNodeAction(formData, payload, currentNodes);

    expect(result).toHaveLength(currentNodes.length + 1);
    expect(result[result.length - 1].data.label).toBe("Mixer Node");
    expect(result[result.length - 1].data.color1).toBe("#fff");
    expect(result[result.length - 1].data.color2).toBe("#fff");
    expect(result[result.length - 1].data.colorRange).toBe(0.5);
  });

  it("should handle errors when setting nodes", async () => {
    const setNodesMock = jest
      .fn()
      .mockRejectedValue(new Error("Failed to set nodes"));
    jest.mock("@/lib/db", () => ({
      setNodes: setNodesMock,
    }));
  });
});
