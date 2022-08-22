import { css, cx } from "@emotion/css";
import type { AnimationSegment } from "lottie-web";
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

export const DarkModeToggle = React.memo<DarkModeToggle.Props>(
  ({ isDarkMode, onChange, size = 85, speed = 1.3, className = "" }) => {
    const [sizeValue, sizeUnit] = parseUnit(size);
    const [segments, setSegments] = React.useState<AnimationSegment>([0, 0]);

    const [isToggleVisible, setIsToggleVisible] = React.useState(false);
    const [canToggleAnimate, setCanToggleAnimate] = React.useState(false);

    // On initial render: snap the toggle to the correct position, do not animate to it
    useDelayedEffectOnce(() => {
      setSegments(isDarkMode ? [40, 41] : [0, 1]);
      setCanToggleAnimate(true);
    });

    // On toggle change: switch the direction of the animation
    React.useEffect(() => {
      setSegments(isDarkMode ? [0, 41] : [42, 96]);
    }, [isDarkMode]);

    return (
      <button
        onClick={() => onChange(!isDarkMode)}
        aria-hidden="true"
        className={cx(buttonStyles(sizeValue, sizeUnit), className)}
      >
        <LottiePlayerLight
          className={playerStyles(isToggleVisible, sizeValue, sizeUnit)}
          play={canToggleAnimate}
          speed={speed}
          animationData={animationData}
          loop={false}
          segments={segments}
          onEnterFrame={() => {
            // Hide the toggle until animation has begun to avoid potentially
            // flashing the toggle in the incorrect position momentarily
            if (!isToggleVisible) setIsToggleVisible(true);
          }}
        />
      </button>
    );
  },
  arePropsEqual
);

DarkModeToggle.displayName = "DarkModeToggle";

function useDelayedEffectOnce(effect: () => void) {
  return React.useEffect(() => {
    setTimeout(() => effect(), 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

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

function playerStyles(isPlayerVisible: boolean, sizeValue: number, sizeUnit: string): string {
  return css({
    display: isPlayerVisible ? "flex" : "none",
    alignItems: "center",
    justifyContent: "center",
    marginTop: `${sizeValue * -0.575}${sizeUnit}`,
    marginLeft: `${sizeValue * -0.32}${sizeUnit}`,
    width: `${sizeValue * 1.65}${sizeUnit}`,
    height: `${sizeValue * 1.65}${sizeUnit}`,
  });
}
