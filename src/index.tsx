import { css, cx } from "@emotion/css";
import { AnimationSegment } from "lottie-web";
import * as React from "react";
import LottiePlayerLight from "react-lottie-player/dist/LottiePlayerLight";

import animationData from "./animationData.json";
import { parseUnit } from "./parseUnit";

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

const lightToDarkSegment: AnimationSegment = [5, 50];
const darkToLightSegment: AnimationSegment = [50, 95];

export const DarkModeToggle = React.memo<DarkModeToggle.Props>(
  ({ isDarkMode, onChange, size = 85, speed = 1.3, className = "" }) => {
    const [sizeValue, sizeUnit] = parseUnit(size);
    const [segments, setSegments] = React.useState<AnimationSegment>([0, 0]);
    const [goTo] = React.useState(isDarkMode ? darkToLightSegment[0] : lightToDarkSegment[0]);

    // Used to snap to the toggle's initial position instead of animating to it
    const [playAnimation, setPlayAnimation] = React.useState(false);

    // Used to prevent an initial flicker of incorrect state
    const [isLottiePlayerMounted, setIsLottiePlayerMounted] = React.useState<boolean>(false);

    const onToggleClick = () => {
      setSegments(!isDarkMode ? lightToDarkSegment : darkToLightSegment);
      setPlayAnimation(true);
      onChange(!isDarkMode);
    };

    const onLottiePlayerMounted = () => {
      setIsLottiePlayerMounted(true);
    };

    return (
      <button
        onClick={onToggleClick}
        aria-hidden="true"
        className={cx(buttonStyles(sizeValue, sizeUnit), className)}
      >
        <LottiePlayerLight
          className={playerStyles(isLottiePlayerMounted, sizeValue, sizeUnit)}
          loop={false}
          speed={speed}
          play={playAnimation}
          animationData={animationData}
          goTo={goTo}
          segments={segments}
          onLoad={onLottiePlayerMounted}
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

function playerStyles(isLoaded: boolean, sizeValue: number, sizeUnit: string): string {
  return css({
    display: isLoaded ? "flex" : "none",
    alignItems: "center",
    justifyContent: "center",
    marginTop: `${sizeValue * -0.575}${sizeUnit}`,
    marginLeft: `${sizeValue * -0.32}${sizeUnit}`,
    width: `${sizeValue * 1.65}${sizeUnit}`,
    height: `${sizeValue * 1.65}${sizeUnit}`,
  });
}
