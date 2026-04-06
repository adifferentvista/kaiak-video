import { AbsoluteFill, Img, staticFile } from "remotion";

export const LogoTest = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
      }}
    >
      {/* Test 1: Img component with SVG */}
      <div style={{ textAlign: "center" }}>
        <Img
          src={staticFile("logos/gmail.svg")}
          style={{ width: 100, height: 100 }}
        />
        <p style={{ color: "#000" }}>Img + SVG</p>
      </div>

      {/* Test 2: img tag with SVG */}
      <div style={{ textAlign: "center" }}>
        <img
          src={staticFile("logos/gmail.svg")}
          style={{ width: 100, height: 100 }}
        />
        <p style={{ color: "#000" }}>img + SVG</p>
      </div>

      {/* Test 3: Img with the PNG logo */}
      <div style={{ textAlign: "center" }}>
        <Img
          src={staticFile("kaiak-logo-png.png")}
          style={{ width: 200 }}
        />
        <p style={{ color: "#000" }}>Img + PNG</p>
      </div>
    </AbsoluteFill>
  );
};
