import {bundle} from '@remotion/bundler';
import {renderMedia, selectComposition} from '@remotion/renderer';
import path from 'path';
 
// total: 6.2, bun: 

const compositionId = 'HelloWorld';
const bundleLocation = await bundle({
  entryPoint: path.resolve('./src/index.ts'),
  webpackOverride: (config) => config,
});

const inputProps = {};
 
const envVariables = {
  REMOTION_VIDEO_LENGTH: process.env.REMOTION_VIDEO_LENGTH,
  REMOTION_BG_VIDEO: process.env.REMOTION_BG_VIDEO
}

const composition = await selectComposition({
  serveUrl: bundleLocation,
  id: compositionId,
  inputProps,
  envVariables
});
 
await renderMedia({
  composition,
  serveUrl: bundleLocation,
  codec: 'h264',
  outputLocation: `out/${compositionId}.mp4`,
  inputProps,
  envVariables
});