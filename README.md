# react-dark-mode-toggle-2

Rewrite of a cute dark mode toggle 🦉

Original library [react-dark-mode-toggle](https://github.com/cawfree/react-dark-mode-toggle) was created by
[Alex Thoma](https://github.com/cawfree). Credit goes out to those who helped build that library to what it is today. 
Let's see if we can take it even further.

<a href="https://reactjs.org/">
    <img alt="react" src="https://badges.aleen42.com/src/react.svg" >
</a>
<a href="https://www.typescriptlang.org">
    <img alt="code language: typescript" src="https://badges.aleen42.com/src/typescript.svg">
</a>
<a href="https://vitejs.dev/">
    <img alt="vitejs" src="https://badges.aleen42.com/src/vitejs.svg">
</a>
<a href="https://github.com/prettier/prettier">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
</a>
<a href="#">
    <img alt="latest release" src="https://img.shields.io/npm/v/react-dark-mode-toggle-2?color=darkgreen">
</a>


<p align="center">
  <img src="./assets/title.gif" width="300" height="300" />
</p>


This rewrite:
- Adds native TS support
- Adds Rollup bundling support (ESM/CJS output targets)
- Adds CSS vendor prefixing via [Emotion](https://github.com/emotion-js/emotion/tree/main/packages/css)
- Resolves issue where prop `checked` is `true` but the toggle initially renders in light-mode then snaps to dark-mode
- Updates `react-lottie-player` to latest for TS support & to fix the above flickering problem
- Project infrastructure (e.g. prettier, husky, lint-staged, etc.)


#### How it works

[react-lottie-player](https://github.com/mifi/react-lottie-player) is used to render a [Lottie](https://lottiefiles.com/)
file (i.e. a JSON payload) in a React component we call `DarkModeToggle`.  This underlying library is a 
peer dependency of the project which is why you'll see it in the installation instructions below.

## 🚀 Installation

##### [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm):

```bash
npm i react-dark-mode-toggle-2 react-lottie-player
```

##### [`yarn`](https://classic.yarnpkg.com/en/docs/install/#mac-stable):

```bash
yarn add react-dark-mode-toggle-2 react-lottie-player
```


## ✨ Usage

```typescript jsx
import React from "react";
import { DarkModeToggle } from "react-dark-mode-toggle-2";

export const YourComponent = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  
  return (
    <DarkModeToggle 
      onChange={setIsDarkMode}
      isDarkMode={isDarkMode} 
      size={85} 
    />
  );
};
```

## 📌 Props

Prop                  | Type     | Default                   | Required
--------------------- | -------- | ------------------------- | --------
`onChange`|func|N/A|Yes
`isDarkMode`|boolean|N/A|Yes
`size`|number (defaults to `px`) or a string containing a number+unit (e.g `"10px"`, `"2em"`, `"4.5rem"`, `"100%"`, etc). These units may also have a space between them (e.g. `"10 px"`, `"2 em"`, etc).|`85px`|No
`speed`|number|`1.3`|No
`className`|string|`''`|No|

> **Note**, this is _not_ a dark mode theme implementation; it's just a button! You'll need to mix this with a management solution such as [use-dark-mode](https://github.com/donavon/use-dark-mode).

### 📝 Notes

In Chrome, you may experience a blue outline around the toggle button after clicking it.
If this behavior concerns you see [this issue](https://github.com/cawfree/react-dark-mode-toggle/issues/17) for more information and available workarounds. 

## ✌️ License
[MIT](https://opensource.org/licenses/MIT)
