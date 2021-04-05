// import { LCompoent } from '../../utils'
const styles = require("./index.scss").default;
import IconButton from "../iconButton";
import defaultConfig from "../../defaultConfig";
require("@/iconfont/iconfont.scss");
import {
  LComponent,
  execCommand,
  restoreSelection,
  saveSelection,
  debounce,
  delegate,
  toggleClass,
} from "../../utils";
interface EditContainerConfig {
  height: string;
  focus: boolean;
  zIndex: number;
}
export default class EditContianer implements LComponent {
  elem: HTMLElement;
  config: EditContainerConfig;
  selectedRange: Range;
  currentSeleted: HTMLElement;
  constructor(selector: string) {
    this.elem = document.querySelector(selector);
    this.config = {
      height: "400px",
      zIndex: 10001,
      focus: true,
    };
  }

  create() {
    this.template();
    this.handler();
    //生成toolbar图标按钮
    defaultConfig.forEach((item) => {
      IconButton(item);
    });
  }

  template() {
    const configTem = this.config;
    this.elem.innerHTML = `
      <div id="leoWrapper" class=${styles.container} style="height:${
      configTem.height
    };z-index:${configTem.zIndex};">
        <div class=${styles["tool-bar"]}>
        </div>
        <div style="height:${
          parseInt(configTem.height) - 60 + "px"
        };outline:none;padding:0 10px;" contenteditable="true" id="leoEditor"><p id="keep-p"><br></p></div>
      </div>
    `;
  }
  handler() {
    const leoEditor: HTMLDivElement = document.querySelector("#leoEditor");
    const toolBar: HTMLDivElement = document.querySelector(".leo-tool-bar");
    if (this.config.focus) {
      leoEditor.focus();
    }
    // defaultParagraphSeparator
    execCommand("defaultParagraphSeparator", "p");
    const keepP = document.querySelector("#keep-p");
    /* 监听输入保存当前selection +防抖*/
    leoEditor.addEventListener(
      "keyup",
      debounce((e) => {
        //监听删除按键keep p标签
        if (e.keyCode === 8 && keepP.innerHTML === "<br>") {
          leoEditor.innerHTML = `<p id="keep-p"><br></p>`;
        }
        this.selectedRange = saveSelection();
      }, 100)
    );
    /* 鼠标拖拽完保存当前selection*/
    leoEditor.addEventListener("mouseup", (e) => {
      this.selectedRange = saveSelection();
    });
    //处理图标的点击事件
    delegate(toolBar, "click", "i", (e) => {
      restoreSelection(this.selectedRange);
      const el = e.target as HTMLElement;
      /* 如果图标上没绑定command 则认定有下拉框 */
      if (!el.dataset.command) {
        let dragEl = el.nextElementSibling as HTMLElement;
        dragEl.style.display = "";
      } else {
        toggleClass(el, styles["hover-color"]);
      }
      execCommand(el.dataset.command, el.dataset.param || "");
    });
    //处理下拉框的点击事件
    delegate(toolBar, "click", "span", (e) => {
      restoreSelection(this.selectedRange);
      let el = e.target as HTMLElement;
      let dragEl = el.parentNode.parentElement;
      dragEl.style.display = "none";
      execCommand(el.dataset.command, el.dataset.param || "");
    });
  }
}
