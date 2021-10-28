import * as React from "react";
import LottiePlayer from "react-lottie-player";
import { parseUnit } from "./parseUnit";
import animationData from "./animationData.json";
import type { AnimationSegment } from "lottie-web";
import { css, cx } from "@emotion/css";

// Allows accessing DarkModeToggleProps type via DarkModeToggle.Props
export declare namespace DarkModeToggle {
  export type Props = {
    /** Whether or not the toggle is currently in dark-mode */
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

const buttonStyles = (sizeValue: number, sizeUnit: string): string =>
  css({
    cursor: "pointer",
    overflow: "hidden",
    width: `${sizeValue}${sizeUnit}`,
    height: `${sizeValue * 0.5}${sizeUnit}`,
    appearance: "none",
    border: "none",
    backgroundColor: "transparent",
    padding: 0,
  });

const lottieStyles = (
  isLottieReady: boolean,
  sizeValue: number,
  sizeUnit: string
): string =>
  css({
    display: isLottieReady ? "flex" : "none",
    alignItems: "center",
    justifyContent: "center",
    marginTop: `${sizeValue * -0.575}${sizeUnit}`,
    marginLeft: `${sizeValue * -0.32}${sizeUnit}`,
    width: `${sizeValue * 1.65}${sizeUnit}`,
    height: `${sizeValue * 1.65}${sizeUnit}`,
  });

const arePropsEqual = (
  prevProps: DarkModeToggle.Props,
  nextProps: DarkModeToggle.Props
) =>
  prevProps.size === nextProps.size &&
  prevProps.isDarkMode === nextProps.isDarkMode &&
  prevProps.speed === nextProps.speed &&
  prevProps.className === nextProps.className;

export const DarkModeToggle = React.memo<DarkModeToggle.Props>(
  ({ isDarkMode, onChange, size = 85, speed = 1.3, className = "" }) => {
    const [sizeValue, sizeUnit] = parseUnit(size);
    const [isLottieReady, setLottieReady] = React.useState(false); // Hide the toggle until Lottie is ready
    const [isReadyToAnimate, setReadyToAnimate] = React.useState(false); // Disable animation of toggle until first click

    const segmentToGoTo: number = isDarkMode ? 51 : 2;
    const segmentsToPlay: AnimationSegment = isDarkMode ? [2, 50] : [51, 96];

    return (
      <button
        onClick={() => {
          if (!isReadyToAnimate) setReadyToAnimate(true);
          onChange(!isDarkMode);
        }}
        aria-hidden="true"
        className={cx(buttonStyles(sizeValue, sizeUnit), className)}
      >
        <LottiePlayer
          className={lottieStyles(isLottieReady, sizeValue, sizeUnit)}
          play={isReadyToAnimate}
          speed={speed}
          animationData={animationData}
          loop={false}
          segments={segmentsToPlay}
          goTo={segmentToGoTo}
          onEnterFrame={() => setLottieReady(true)}
        />
      </button>
    );
  },
  arePropsEqual
);

DarkModeToggle.displayName = "DarkModeToggle";
