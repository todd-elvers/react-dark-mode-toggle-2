import * as React from "react";
import { DarkModeToggle } from "./index";
import * as Storybook from "@storybook/react";
import { action } from "@storybook/addon-actions";

export default {
  title: "Toggle",
  component: DarkModeToggle,
  argTypes: {
    onChange: {
      table: {
        disable: true,
      },
    },
  },
} as Storybook.Meta;

const Template: Storybook.Story<Omit<DarkModeToggle.Props, "onChange">> = (
  props
) => {
  // Locally state controlling the toggle
  const [isDarkMode, setIsDarkMode] = React.useState(props.isDarkMode);

  // Update our local state if user toggles `isDarkMode` in Storybook UI
  React.useEffect(() => setIsDarkMode(props.isDarkMode), [props.isDarkMode]);

  return (
    <DarkModeToggle
      {...props}
      isDarkMode={isDarkMode}
      onChange={(isDarkMode) => {
        action("onChange")({ isDarkMode });
        console.log("onChange called:", { isDarkMode });
        setIsDarkMode(isDarkMode);
      }}
    />
  );
};

export const StartingInLightMode = Template.bind({});
StartingInLightMode.args = {
  isDarkMode: false,
  speed: 1.3,
  size: 150,
};

export const StartingInDarkMode = Template.bind({});
StartingInDarkMode.args = {
  isDarkMode: true,
  speed: 1.3,
  size: 150,
};

export const AnimationFast = Template.bind({});
AnimationFast.args = {
  isDarkMode: false,
  speed: 4,
  size: 150,
};

export const AnimationSlow = Template.bind({});
AnimationSlow.args = {
  isDarkMode: false,
  speed: 0.3,
  size: 150,
};

export const SizeAsNumberDefaultsToPixels = Template.bind({});
SizeAsNumberDefaultsToPixels.args = {
  isDarkMode: false,
  speed: 1.3,
  size: 150,
};

export const SizeAsPixels = Template.bind({});
SizeAsPixels.args = {
  isDarkMode: false,
  speed: 1.3,
  size: "150px",
};

export const SizeAsRems = Template.bind({});
SizeAsRems.args = {
  isDarkMode: false,
  speed: 1.3,
  size: "15rem",
};

export const SizeAsPercent = Template.bind({});
SizeAsPercent.args = {
  isDarkMode: false,
  speed: 1.3,
  size: "32%",
};

export const DefaultProps = Template.bind({});
SizeAsPercent.args = {
  isDarkMode: false,
};
