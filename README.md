# react-dark-mode-toggle-2

<div align="center">
  <img src="./assets/title.gif" width="300" height="300" alt="title animation" />

[![react](https://badges.aleen42.com/src/react.svg)](https://reactjs.org/)
[![typescript](https://badges.aleen42.com/src/typescript.svg)](https://www.typescriptlang.org)
[![latest release](https://img.shields.io/npm/v/react-dark-mode-toggle-2?color=darkgreen&label=latest)](#)
[![bundle size](https://img.badgesize.io//todd-elvers/react-dark-mode-toggle-2/main/assets/index.cjs.js.svg?compression=gzip)](#)
</div>

A cute dark mode toggle 🦉

## 🗝 Key features

- Small bundle size
- Written in TypeScript
- React 18 support
- ESM support
- SSR support

## 🚀 Installation

```bash
yarn add react-dark-mode-toggle-2
```

or

```bash
npm install react-dark-mode-toggle-2 --save
```

or

```bash
pnpm add react-dark-mode-toggle-2
```

## ✨ Usage

```typescript jsx
import React from "react";
import { DarkModeToggle } from "react-dark-mode-toggle-2";

export const YourComponent = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  
  return (
    <DarkModeToggle
      isDarkMode={isDarkMode}
      onChange={setIsDarkMode}
    />
  );
};
```

## 📌 Props

Prop                  | Type                                                                                                                                                                                               | Default                   | Required
--------------------- |----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| ------------------------- | --------
`attributes` | optional object containing attributes to spread onto the button
`isDarkMode`| boolean                                                                                                                                                                                            |N/A|Yes
`onChange`| function that recieves a single argument: the new value of `isDarkMode`                                                                                                                             |N/A|Yes
`size`| number (defaults to `px`) or a string containing a number+unit (e.g `"10px"`, `"2em"`, `"4.5rem"`, `"100%"`, etc). These units may also have a space between them (e.g. `"10 px"`, `"2 em"`, etc). |`85px`|No
`speed`| number                                                                                                                                                                                             |`1.3`|No
`className`| string                                                                                                                                                                                             |`''`|No|
`id`| string                                                                                                                                                                                             |`''`|No|

> **Note**, this is _not_ a dark mode theme implementation; it's just a button! You'll need to mix this with a management solution such as [use-dark-mode](https://github.com/donavon/use-dark-mode).

### 📝 Notes

In Chrome, you may experience a blue outline around the toggle button after clicking it.
If this behavior concerns you see [this issue](https://github.com/cawfree/react-dark-mode-toggle/issues/17) for more information and available workarounds. 


### 🤝 Original Work
Original library [react-dark-mode-toggle](https://github.com/cawfree/react-dark-mode-toggle) was created by
[Alex Thoma](https://github.com/cawfree). Credit to them and the community for the original work.


## ✌️ License
[MIT](https://opensource.org/licenses/MIT)
