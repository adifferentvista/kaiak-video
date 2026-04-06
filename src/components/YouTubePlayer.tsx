import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const YouTubePlayer: React.FC<{
  channelName: string;
  videoTitle: string;
  children: React.ReactNode;
}> = ({ channelName, videoTitle, children }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const progressWidth = interpolate(frame, [0, 210], [0, 100], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f0f",
        opacity,
        padding: "40px 80px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Video area */}
      <div
        style={{
          width: "100%",
          maxWidth: 1400,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Video container */}
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            backgroundColor: "#000",
            borderRadius: "12px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Video content */}
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            {children}
          </div>

          {/* Progress bar */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 4,
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progressWidth}%`,
                backgroundColor: "#ff0000",
                borderRadius: "0 2px 2px 0",
              }}
            />
          </div>

          {/* YouTube controls overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 8,
              left: 12,
              right: 12,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "4px 0",
            }}
          >
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              {/* Play button */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
              {/* Volume */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
              </svg>
              <span
                style={{
                  color: "white",
                  fontSize: 13,
                  fontFamily: "Roboto, Arial, sans-serif",
                }}
              >
                0:0{Math.floor(frame / 30)} / 0:07
              </span>
            </div>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              {/* Settings gear */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.48-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
              </svg>
              {/* Fullscreen */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Video info below */}
        <div style={{ marginTop: 16, padding: "0 4px" }}>
          <h2
            style={{
              color: "#f1f1f1",
              fontSize: 22,
              fontWeight: 600,
              fontFamily: "Roboto, Arial, sans-serif",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {videoTitle}
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 14,
            }}
          >
            {/* Channel info */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* Avatar */}
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: 18,
                  fontWeight: 700,
                  fontFamily: "Roboto, Arial, sans-serif",
                }}
              >
                C
              </div>
              <div>
                <div
                  style={{
                    color: "#f1f1f1",
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: "Roboto, Arial, sans-serif",
                  }}
                >
                  {channelName}
                </div>
                <div
                  style={{
                    color: "#aaa",
                    fontSize: 13,
                    fontFamily: "Roboto, Arial, sans-serif",
                  }}
                >
                  AI & Tech Tutorials
                </div>
              </div>
              {/* Subscribe button */}
              <div
                style={{
                  backgroundColor: "#f1f1f1",
                  color: "#0f0f0f",
                  padding: "8px 18px",
                  borderRadius: 20,
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: "Roboto, Arial, sans-serif",
                  marginLeft: 12,
                }}
              >
                Subscribe
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: 20,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "8px 16px",
                    color: "#f1f1f1",
                    fontSize: 14,
                    fontFamily: "Roboto, Arial, sans-serif",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                  </svg>
                  1.2K
                </div>
                <div
                  style={{
                    width: 1,
                    backgroundColor: "rgba(255,255,255,0.2)",
                  }}
                />
                <div
                  style={{
                    padding: "8px 16px",
                    color: "#f1f1f1",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
                  </svg>
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: 20,
                  padding: "8px 16px",
                  color: "#f1f1f1",
                  fontSize: 14,
                  fontFamily: "Roboto, Arial, sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M21 12l-18 12v-24l18 12z" transform="rotate(90 12 12) scale(0.7) translate(5, 5)" />
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                </svg>
                Share
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
