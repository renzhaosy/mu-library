---
title: useToggle
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
---

# useToggle

用于在两个状态值间切换的 Hook。

## 例子

### 基本用法

<code src="./demo/demo1.tsx" />

### 高级用法

<code src="./demo/demo2.tsx" />

## API

```javascript
const [state, { toggle, setLeft, setRight }] = useToggle(
  defaultValue?: boolean,
);

const [state,{ toggle, setLeft, setRight }] = useToggle(
  defaultValue: any = false,
  reverseValue?: any,
);
```