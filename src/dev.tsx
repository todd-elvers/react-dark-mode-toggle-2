import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { DarkModeToggle } from "./index";

/** Internal dev page w/ fast-refresh, run using 'yarn dev' */

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ControlledDarkModeToggle />
  </React.StrictMode>
);

function ControlledDarkModeToggle() {
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
      <DarkModeToggle size={150} isDarkMode={isDarkMode} onChange={setIsDarkMode} />
    </div>
  );
}
