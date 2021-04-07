# LeoEditor

用 webpack 和 typescript 实现一个简单的富文本编辑器

## usage

---

### NPM or YARN

```
npm install leoeditor --save
```

```
yarn add leoeditor
```

最简单的使用:初始化挂载到一个` html` 标签上

```
import L from "leoeditor";
import "leoeditor/dist/main.css";
const editor = new L("#app");
editor.create();
```
