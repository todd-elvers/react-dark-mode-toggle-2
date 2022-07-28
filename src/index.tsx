import * as React from "react";
import LottiePlayerLight from "react-lottie-player/dist/LottiePlayerLight";
import { parseUnit } from "./parseUnit";
import animationData from "./animationData.json";
import type { AnimationSegment } from "lottie-web";
import { css, cx } from "@emotion/css";

// Allows accessing DarkModeToggleProps type via DarkModeToggle.Props
export declare namespace DarkModeToggle {
  export type Props = {
    /** Whether the toggle is currently in dark-mode */
    readonly isDarkMode: boolean;

    /** Use this to update the state that controls the `isDarkMode` prop */
    readonly onChange: (isDarkMode: boolean) => void;

    /** Size of the component. Numbers = pixels. Strings = "<number><unit>" e.g. "20px" or "1.5%" (default = "85px"); */
    readonly size?: number | string;

    /** Use this to control the speed at which the toggle animation occurs (default = 2.5) */
    readonly speed?: number;

    /** Optional className prop for the <button/> element (default = "") */
    readonly className?: string;
  };
}

// TODO: Add ESLint
export const DarkModeToggle = React.memo<DarkModeToggle.Props>(
  ({ isDarkMode, onChange, size = 85, speed = 1.3, className = "" }) => {
    const [sizeValue, sizeUnit] = parseUnit(size);
    const [segments, setSegments] = React.useState<AnimationSegment>([0, 0]);
    const [goTo, setGoTo] = React.useState(0);
    const [isReadyToAnimate, setReadyToAnimate] = React.useState(false);
    const [isLottiePlayerVisible, setLottiePlayerVisible] = React.useState(false);

    // Snap the toggle to the initial position, do not animate to it
    React.useEffect(() => {
      setTimeout(() => {
        setSegments(isDarkMode ? [40, 41] : [0, 1]);
        setReadyToAnimate(true);
      }, 10);
    }, []);

    // Switch the direction of the animation when the mode changes
    React.useEffect(() => {
      if (!isLottiePlayerVisible) return;
      setGoTo(isDarkMode ? 41 : 0);
      setSegments(isDarkMode ? [0, 41] : [42, 96]);
    }, [isLottiePlayerVisible, isDarkMode]);

    return (
      <button
        onClick={() => onChange(!isDarkMode)}
        aria-hidden="true"
        className={cx(buttonStyles(sizeValue, sizeUnit), className)}
      >
        <LottiePlayerLight
          className={lottieStyles(isLottiePlayerVisible, sizeValue, sizeUnit)}
          play={isReadyToAnimate}
          speed={speed}
          animationData={animationData}
          loop={false}
          segments={segments}
          goTo={goTo}
          onEnterFrame={() => setLottiePlayerVisible(true)}
        />
      </button>
    );
  },
  arePropsEqual
);

DarkModeToggle.displayName = "DarkModeToggle";

function arePropsEqual(prevProps: DarkModeToggle.Props, nextProps: DarkModeToggle.Props) {
  return (
    prevProps.size === nextProps.size &&
    prevProps.isDarkMode === nextProps.isDarkMode &&
    prevProps.speed === nextProps.speed &&
    prevProps.className === nextProps.className
  );
}

function lottieStyles(isLottieReady: boolean, sizeValue: number, sizeUnit: string): string {
  return css({
    display: isLottieReady ? "flex" : "none",
    alignItems: "center",
    justifyContent: "center",
    marginTop: `${sizeValue * -0.575}${sizeUnit}`,
    marginLeft: `${sizeValue * -0.32}${sizeUnit}`,
    width: `${sizeValue * 1.65}${sizeUnit}`,
    height: `${sizeValue * 1.65}${sizeUnit}`,
  });
}

function buttonStyles(sizeValue: number, sizeUnit: string): string {
  return css({
    cursor: "pointer",
    overflow: "hidden",
    width: `${sizeValue}${sizeUnit}`,
    height: `${sizeValue * 0.5}${sizeUnit}`,
    appearance: "none",
    border: "none",
    backgroundColor: "transparent",
    padding: 0,
  });
}
