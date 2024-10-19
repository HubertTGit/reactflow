import Spectrum, { colorMix } from "@snipshot/spectrum";

export default function colorMixer(
  color1: string,
  color2: string,
  weight: number,
) {
  const spec1 = new Spectrum("hex", color1);
  const spec2 = new Spectrum("hex", color2);

  const mixed = colorMix(spec1, spec2, 1 - weight);
  return mixed.hex;
}
