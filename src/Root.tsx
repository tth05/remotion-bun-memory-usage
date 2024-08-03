import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";

export const RemotionRoot: React.FC = () => {
  return (
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={60}
        width={1920}
        height={1080}
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
	      calculateMetadata={() => ({durationInFrames: Number(process.env.REMOTION_VIDEO_LENGTH)})}
      />
  );
};
