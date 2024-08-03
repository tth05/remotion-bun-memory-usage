import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile
} from "remotion";

export const HelloWorld: React.FC<z.infer<typeof myCompSchema>> = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      {!!process.env.REMOTION_BG_VIDEO && <OffthreadVideo src={staticFile("output.mp4")} />}
    </AbsoluteFill>
  );
};
