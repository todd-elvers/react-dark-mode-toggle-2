import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { DarkModeToggle } from "./index";

/** Local development page w/ fast-refresh - called when running 'yarn dev' */

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocalDevelopment />
  </React.StrictMode>
);

function LocalDevelopment() {
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
