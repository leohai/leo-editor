export interface LComponent {
  readonly create: () => void;
  readonly template: () => void;
  readonly handler: () => void;
}
/**
 * @function 保存当前的Range对象
 */
export const saveSelection = () => {
  let selection = window.getSelection();
  if (selection.rangeCount > 0) {
    return selection.getRangeAt(0);
  }
  return null;
};
export const execCommand = (id: string, val?: string) => {
  return document.execCommand(id, false, val);
};
/**
 * @function 重置Range对象
 * @param selectedRange 之前光标的Range对象
 */
export const restoreSelection = (selectedRange: Range) => {
  let selection = window.getSelection();
  if (selectedRange) {
    selection.removeAllRanges();
    selection.addRange(selectedRange);
  }
};
/**
 * @function 防抖
 * @param callback
 * @param delay
 * @returns
 */
export const debounce = (
  callback: (e: KeyboardEvent) => void,
  delay: number = 500
) => {
  let timer: NodeJS.Timeout = null;
  return function () {
    const that = this;
    const args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    // 每隔delay的时间, 启动一个新的延迟定时器, 去准备调用callback
    timer = setTimeout(function () {
      callback.apply(that, args);
      // 如果定时器回调执行了, 删除标记
      timer = null;
    }, delay);
  };
};
/**
 * @function 事件代理
 * @param element
 * @param eventType
 * @param selector
 * @param fn
 */
export const delegate = (
  element: HTMLElement,
  eventType: string,
  selector: string,
  fn: (e: Event) => void
) => {
  element.addEventListener(eventType, (e: Event) => {
    let el = e.target as HTMLElement;
    while (!el.matches(selector)) {
      if (element == el) {
        el = null;
        break;
      }
      el = el.parentNode as HTMLElement;
    }
    el && fn.call(el, e);
  });
};
/**
 * @function 添加样式
 * @param ele
 * @param name
 */
export const addClass = (ele: HTMLElement, name: string) => {
  if (name) {
    ele.className
      ? (ele.className = ele.className + " " + name)
      : (ele.className = name);
  } else {
    throw new Error("请传递一个有效的class类名");
  }
};
/**
 * @function 移除样式
 * @param ele
 * @param name
 */
export const removeClass = (ele: HTMLElement, name: string) => {
  let classArr: Array<string> = ele.className.split(" ");
  const index = classArr.findIndex((item) => item === name);
  classArr.splice(index, 1);
  ele.className = classArr.join(" ");
};
export const toggleClass = (ele: HTMLElement, name: string) => {
  if (ele.className && ele.className.includes(name)) {
    removeClass(ele, name);
  } else {
    addClass(ele, name);
  }
};
