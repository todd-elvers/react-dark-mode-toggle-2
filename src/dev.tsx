import { AnimationDirection, AnimationSegment } from "lottie-web";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import LottiePlayerLight from "react-lottie-player/dist/LottiePlayerLight";

import { DarkModeToggle } from ".";
import animationData from "./animationData.json";

/** Local development page w/ animation controls - called when running 'yarn dev' */

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocalDevelopment />
    {/* <LocalDevelopmentComponent /> */}
  </React.StrictMode>
);

const lightToDarkSegment: AnimationSegment = [5, 50];
const darkToLightSegment: AnimationSegment = [50, 95];

function LocalDevelopment() {
  const [segmentFrom, setSegmentFrom] = React.useState(lightToDarkSegment[0]);
  const [segmentTo, setSegmentTo] = React.useState(lightToDarkSegment[1]);
  const [segmentsEnabled, setSegmentsEnabled] = React.useState(true);
  const [speed, setSpeed] = React.useState(1);
  const [direction, setDirection] = React.useState<AnimationDirection>(1);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [goToEnabled, setGoToEnabled] = React.useState(true);
  const [goTo, setGoTo] = React.useState<number>(isDarkMode ? 42 : 0);
  const segments: AnimationSegment = [segmentFrom, segmentTo];

  React.useEffect(() => {
    console.log(`Should start in ${isDarkMode ? "dark" : "light"} mode`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [log, setLog] = React.useState<string[]>([]);
  const addLog = (v: string) => setLog((l) => [v, ...l]);

  // Used to snap to the toggle's initial position instead of animating to it
  const [playAnimation, setPlayAnimation] = React.useState(false);

  // Used to prevent an initial flicker of incorrect state
  const [isLottiePlayerMounted, setIsLottiePlayerMounted] = React.useState<boolean>(false);

  const onToggleDarkModeState = () => {
    setSegmentFrom(!isDarkMode ? lightToDarkSegment[0] : darkToLightSegment[0]);
    setSegmentTo(!isDarkMode ? lightToDarkSegment[1] : darkToLightSegment[1]);
    setPlayAnimation(true);
  };

  const onToggleClick = () => {
    setSegmentFrom(!isDarkMode ? lightToDarkSegment[0] : darkToLightSegment[0]);
    setSegmentTo(!isDarkMode ? lightToDarkSegment[1] : darkToLightSegment[1]);
    setPlayAnimation(true);
    setIsDarkMode(!isDarkMode);
    console.time("Animation duration");
  };

  const onLottiePlayerMounted = () => {
    setIsLottiePlayerMounted(true);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          boxShadow: "0 0 10px 10px rgba(0,0,0,0.03)",
          width: 300,
          maxWidth: "100%",
          margin: 30,
          padding: 30,
          borderRadius: 7,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button
          onClick={onToggleClick}
          aria-hidden="true"
          style={{ display: isLottiePlayerMounted ? "block" : "none" }}
          id="dark-mode-toggle"
        >
          <LottiePlayerLight
            loop={false}
            speed={speed}
            play={playAnimation}
            animationData={animationData}
            goTo={goTo}
            segments={segments}
            onLoad={() => {
              addLog("load");
              onLottiePlayerMounted();
            }}
            style={{
              width: 280,
              height: 180,
            }}
            onComplete={() => {
              addLog("complete");
              console.timeEnd("Animation duration");
            }}
            onLoopComplete={() => addLog("loopComplete")}
            onSegmentStart={() => addLog("segmentStart")}
          />
        </button>

        <div style={{ margin: "7px 0" }}>
          <input
            type="checkbox"
            checked={playAnimation}
            onChange={(e) => setPlayAnimation(e.target.checked)}
            id="playing1"
          />{" "}
          <label htmlFor="playing1">Playing</label>
        </div>

        <div style={{ margin: "7px 0" }}>
          <div style={{ marginBottom: 5 }}>
            <input
              type="checkbox"
              checked={segmentsEnabled}
              onChange={(e) => setSegmentsEnabled(e.target.checked)}
              id="segmentsEnabled"
            />
            <label htmlFor="segmentsEnabled">Segments enabled</label>
          </div>
          <div style={{ marginLeft: 10 }}>
            Segment from
            <br />
            <input
              disabled={!segmentsEnabled}
              type="number"
              value={segmentFrom}
              onChange={(e) => setSegmentFrom(parseInt(e.target.value, 10))}
            />
          </div>
          <div style={{ marginLeft: 10 }}>
            Segment to
            <br />
            <input
              disabled={!segmentsEnabled}
              type="number"
              value={segmentTo}
              onChange={(e) => setSegmentTo(parseInt(e.target.value, 10))}
            />
          </div>
        </div>

        <div style={{ margin: "7px 0" }}>
          <div style={{ marginBottom: 5 }}>
            <input
              type="checkbox"
              checked={goToEnabled}
              onChange={(e) => setGoToEnabled(e.target.checked)}
              id="goToEnabled"
            />
            <label htmlFor="goToEnabled">GoTo enabled</label>
          </div>
          <div style={{ marginLeft: 10 }}>
            GoTo
            <br />
            <input
              disabled={!goToEnabled}
              type="number"
              value={goTo}
              onChange={(e) => {
                const num = parseInt(e.target.value, 10);
                if (!isNaN(num)) setGoTo(num);
              }}
            />
          </div>
        </div>

        <div style={{ margin: "10px 0" }}>
          Speed
          <input
            style={{ width: "100%" }}
            type="range"
            min="0"
            max="100"
            value={speed * 20}
            onChange={(e) => setSpeed(parseInt(e.target.value, 10) / 20)}
            step="1"
          />
        </div>

        <div style={{ margin: "10px 0" }}>
          Direction
          <br />
          <input
            style={{
              padding: 5,
              margin: 5,
              border: direction === -1 ? "2px solid black" : undefined,
            }}
            type="button"
            value="-1"
            onClick={() => setDirection(-1)}
          />
          <input
            style={{
              padding: 5,
              margin: 5,
              border: direction === 1 ? "2px solid black" : undefined,
            }}
            type="button"
            value="1"
            onClick={() => setDirection(1)}
          />
        </div>

        <div>Event log</div>
        <div
          style={{
            height: 100,
            width: "80%",
            overflowY: "scroll",
            background: "rgba(0,0,0,0.03)",
            borderRadius: 5,
            padding: 10,
          }}
        >
          {log.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LocalDevelopmentComponent() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  return (
    <div
      // Uncomment to test useEffect handler for external state change
      // This will make any click in the page change the isDarkMode state
      // onClick={() => setIsDarkMode(!isDarkMode)}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div
        style={{
          boxShadow: "0 0 10px 10px rgba(0,0,0,0.03)",
          width: 300,
          maxWidth: "100%",
          margin: 30,
          padding: 30,
          borderRadius: 7,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DarkModeToggle isDarkMode={isDarkMode} onChange={setIsDarkMode} />
      </div>
    </div>
  );
}
