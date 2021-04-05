import { LComponent, addClass } from "../../utils";
const styles = require("./index.scss").default;

import { ToolConfig } from "../../defaultConfig";
class IconButton implements LComponent {
  props: ToolConfig;
  constructor(props: ToolConfig) {
    this.props = props;
  }
  create() {
    this.template();
  }
  template() {
    const { icon, command = "", param = "", DragDownProps } = this.props;
    let toolBar = document.querySelector(".leo-tool-bar");
    //添加按钮
    let IconWrapper = document.createElement("div");
    addClass(IconWrapper, styles["tool-wrapper"]);
    let htmlTemp = `<i class="iconfont ${icon}" data-command="${command}" data-param="${param}">
    </i><ul style="display:none;" class=${styles["drop-down-container"]}>`;
    //添加下拉框
    if (DragDownProps) {
      DragDownProps.forEach((item) => {
        htmlTemp += `<li class=${styles["drop-down-item"]}>
          <span data-command="${item.command || ""}" data-param="${
          item.param || ""
        }">${item.text}</span>
        </li>`;
      });
    }

    htmlTemp += "</ul>";
    IconWrapper.innerHTML = htmlTemp;
    toolBar.appendChild(IconWrapper);
  }
  handler() {}
}

const iconButton = (props: ToolConfig) => {
  return new IconButton(props).create();
};
export default iconButton;
