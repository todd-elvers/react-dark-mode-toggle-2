import * as React from "react";
import * as ReactDOM from "react-dom";
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

ReactDOM.render(
  <React.StrictMode>
    <ControlledDarkModeToggle />
  </React.StrictMode>,
  document.getElementById("root")
);
