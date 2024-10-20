import colorMixer from "./colorMixer";

describe("colorMixer", () => {
  it("should return a mixed color when given two colors and a weight", () => {
    const color1 = "#ff0000";
    const color2 = "#00ff00";
    const weight = 0.5;
    const expected = "#808000";

    const result = colorMixer(color1, color2, weight);

    expect(result).toEqual(expected);
  });

  it("should return the first color when the weight is 0", () => {
    const color1 = "#ff0000";
    const color2 = "#00ff00";
    const weight = 0;
    const expected = "#ff0000";

    const result = colorMixer(color1, color2, weight);

    expect(result).toEqual(expected);
  });

  it("should return the second color when the weight is 1", () => {
    const color1 = "#ff0000";
    const color2 = "#00ff00";
    const weight = 1;
    const expected = "#00ff00";

    const result = colorMixer(color1, color2, weight);

    expect(result).toEqual(expected);
  });
});
