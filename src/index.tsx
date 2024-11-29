import * as React from "react";
import { AnimationSegment } from "lottie-web";
import clsx from "clsx";
import styles from "./index.module.css";
import { parseUnit } from "./parseUnit";

export declare namespace DarkModeToggle {
  export type Props = {
    readonly attributes?: object;
    readonly isDarkMode: boolean;
    readonly onChange: (isDarkMode: boolean) => void;
    readonly size?: number | string;
    readonly speed?: number;
    readonly className?: string;
    readonly id?: string;
  };
}

const lightToDarkSegment: AnimationSegment = [5, 50];
const darkToLightSegment: AnimationSegment = [50, 95];

// Dynamically import both the player and animation data
const loadDependencies = async () => {
  const [{ default: LottiePlayer }, { default: animationData }] = await Promise.all([
    import("react-lottie-player/dist/LottiePlayerLight"),
    import("./animationData.json"),
  ]);
  return { LottiePlayer, animationData };
};

export const DarkModeToggle = React.memo<DarkModeToggle.Props>(
  ({ attributes = {}, isDarkMode, onChange, size = 85, speed = 1.3, className = "", id = "" }) => {
    const [sizeValue, sizeUnit] = parseUnit(size);
    const [segments, setSegments] = React.useState<AnimationSegment>([0, 0]);
    const [goTo] = React.useState(isDarkMode ? darkToLightSegment[0] : lightToDarkSegment[0]);
    const [playAnimation, setPlayAnimation] = React.useState(false);
    const [isLottiePlayerMounted, setIsLottiePlayerMounted] = React.useState(false);
    const [dependencies, setDependencies] = React.useState<{
      LottiePlayer: any;
      animationData: any;
    } | null>(null);

    // Load dependencies on mount
    React.useEffect(() => {
      let mounted = true;
      loadDependencies().then((deps) => {
        if (mounted) {
          setDependencies(deps);
        }
      });
      return () => {
        mounted = false;
      };
    }, []);

    React.useEffect(() => {
      onToggleDarkModeState();
    }, [isDarkMode]);

    const onToggleDarkModeState = React.useCallback(() => {
      setSegments(isDarkMode ? lightToDarkSegment : darkToLightSegment);
      setPlayAnimation(isLottiePlayerMounted);
    }, [isDarkMode, isLottiePlayerMounted]);

    const onToggleClick = React.useCallback(() => {
      setSegments(!isDarkMode ? lightToDarkSegment : darkToLightSegment);
      setPlayAnimation(true);
      onChange(!isDarkMode);
    }, [isDarkMode, onChange]);

    const onLottiePlayerMounted = React.useCallback(() => {
      setIsLottiePlayerMounted(true);
    }, []);

    return (
      <button
        {...attributes}
        onClick={onToggleClick}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        style={{
          width: `${sizeValue}${sizeUnit}`,
          height: `${sizeValue * 0.5}${sizeUnit}`,
        }}
        className={clsx(styles.button, className)}
        id={id}
      >
        {dependencies ? (
          <dependencies.LottiePlayer
            className={clsx(styles.player, { [styles["player--loaded"]]: isLottiePlayerMounted })}
            style={{
              marginTop: `${sizeValue * -0.575}${sizeUnit}`,
              marginLeft: `${sizeValue * -0.32}${sizeUnit}`,
              width: `${sizeValue * 1.65}${sizeUnit}`,
              height: `${sizeValue * 1.65}${sizeUnit}`,
            }}
            loop={false}
            speed={speed}
            play={playAnimation}
            animationData={dependencies.animationData}
            goTo={goTo}
            segments={segments}
            onLoad={onLottiePlayerMounted}
          />
        ) : null}
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
    prevProps.className === nextProps.className &&
    prevProps.id === nextProps.id
  );
}
