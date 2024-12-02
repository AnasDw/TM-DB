import * as React from "react";

const EmptySyntheticInterviewsImgWithChildren: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => (
  <div
    style={{
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
      backgroundImage: "url(/assets/images/chat-indication.svg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      marginTop: 8,
    }}
  >
    <div style={{ zIndex: 1 }}>{children}</div>
  </div>
);

export default EmptySyntheticInterviewsImgWithChildren;
