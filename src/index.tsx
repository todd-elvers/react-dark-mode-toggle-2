import clsx from "clsx";
import { AnimationSegment } from "lottie-web";
import * as React from "react";
import type { LottieProps } from "react-lottie-player";

import styles from "./index.module.css";
import { parseUnit } from "./parseUnit";

interface LottieLayer {
  ddd: number;
  ind: number;
  ty: number;
  nm: string;
  sr: number;
  ks: {
    o: { a: number; k: number; ix: number };
    r: { a: number; k: number; ix: number };
    p: { a: number; k: number[]; ix: number };
    a: { a: number; k: number[]; ix: number };
    s: { a: number; k: number[]; ix: number };
  };
  ao: number;
  ip: number;
  op: number;
  st: number;
  bm: number;
}

interface LottieAsset {
  id: string;
  w: number;
  h: number;
  p: string;
  u: string;
  e: number;
}

interface LottieAnimationData {
  v: string;
  fr: number;
  ip: number;
  op: number;
  w: number;
  h: number;
  nm: string;
  ddd: number;
  assets: LottieAsset[];
  layers: LottieLayer[];
}

type Dependencies = {
  LottiePlayer: React.ComponentType<LottieProps>;
  animationData: LottieAnimationData;
} | null;

const loadDependencies = async (): Promise<Dependencies> => {
  const [{ default: LottiePlayer }, { default: animationData }] = (await Promise.all([
    import("react-lottie-player/dist/LottiePlayerLight"),
    import("./animationData.json"),
  ])) as [{ default: React.ComponentType<LottieProps> }, { default: LottieAnimationData }];
  return { LottiePlayer, animationData };
};

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

export const DarkModeToggle = React.memo<DarkModeToggle.Props>(
  ({ attributes = {}, isDarkMode, onChange, size = 85, speed = 1.3, className = "", id = "" }) => {
    const [sizeValue, sizeUnit] = parseUnit(size);
    const [segments, setSegments] = React.useState<AnimationSegment>([0, 0]);
    const [goTo] = React.useState(isDarkMode ? darkToLightSegment[0] : lightToDarkSegment[0]);
    const [playAnimation, setPlayAnimation] = React.useState(false);
    const [isLottiePlayerMounted, setIsLottiePlayerMounted] = React.useState(false);
    const [dependencies, setDependencies] = React.useState<Dependencies>(null);

    const onToggleDarkModeState = React.useCallback(() => {
      setSegments(isDarkMode ? lightToDarkSegment : darkToLightSegment);
      setPlayAnimation(isLottiePlayerMounted);
    }, [isDarkMode, isLottiePlayerMounted]);

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
    }, [isDarkMode, onToggleDarkModeState]);

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
        role="switch"
        aria-checked={isDarkMode}
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
);

DarkModeToggle.displayName = "DarkModeToggle";
