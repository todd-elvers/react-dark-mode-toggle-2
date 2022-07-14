import React from "react";
import { createRoot } from "react-dom/client";
import { DarkModeToggle } from "./index";

const ControlledDarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <DarkModeToggle
        size={150}
        isDarkMode={isDarkMode}
        onChange={setIsDarkMode}
      />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ControlledDarkModeToggle />
  </React.StrictMode>
);
