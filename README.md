# Bun vs Node memory usage example

#### Setup

```
bun install
```

#### Usage

Render 600 frames of a blank video:

```
REMOTION_VIDEO_LENGTH=600 bun run ./src/render.ts
REMOTION_VIDEO_LENGTH=600 node --import=tsx ./src/render.ts
```

#### Background video

Using remotions OffthreadVideo as a background video will exaggerate the difference in memory usage.
First, generate a dummy background video:

```
ffmpeg -f lavfi -i nullsrc=s=1280x720 -filter_complex "geq=random(1)*255:128:128" -t 10 public/output.mp4
```

Then run with `REMOTION_BG_VIDEO=1` enabled

#### Results

```
Windows 10
Node v21.2.0
Bun 1.1.21
```

Below is sample table of very unscientifically collected results (looking at task manager), but it should be enough to
show the difference in memory usage between bun and node. All runs that use a background video used a 10 second video
generated with ffmpeg as described above.

| Config                                              | Peak total memory usage | Peak runtime memory usage (Bun/Node) |
|-----------------------------------------------------|-------------------------|--------------------------------------|
| REMOTION_VIDEO_LENGTH=600 bun                       | 1300MB                  | 470MB                                |
| REMOTION_VIDEO_LENGTH=600 node                      | 1050MB                  | 140MB                                |
| REMOTION_VIDEO_LENGTH=600 REMOTION_BG_VIDEO=1 bun   | 4100MB                  | 1800MB                               |
| REMOTION_VIDEO_LENGTH=600 REMOTION_BG_VIDEO=1 node  | 3000MB                  | 140MB                                |
| REMOTION_VIDEO_LENGTH=1200 REMOTION_BG_VIDEO=1 bun  | 5300MB                  | 2200MB                               |
| REMOTION_VIDEO_LENGTH=1200 REMOTION_BG_VIDEO=1 node | 3200MB                  | 140MB                                |

For longer videos you will that at some point bun will run out of memory and crash, while node is able to still
render videos.

