export type DragDownProps = Array<{
  text: string;
  command?: string;
  param?: string;
}>;
export interface ToolConfig {
  icon: string;
  command?: string;
  param?: string;
  DragDownProps?: DragDownProps;
}
export type ToolConfigArray = Array<ToolConfig>;

const defaultConfig: ToolConfigArray = [
  {
    icon: "icon-title",
    command: "",
    DragDownProps: [
      {
        text: "H1",
        command: "formatBlock",
        param: "H1",
      },
      {
        text: "H2",
        command: "formatBlock",
        param: "H2",
      },
      {
        text: "H3",
        command: "formatBlock",
        param: "H3",
      },
      {
        text: "H4",
        command: "formatBlock",
        param: "H4",
      },
      {
        text: "H5",
        command: "formatBlock",
        param: "H5",
      },
      {
        text: "H6",
        command: "formatBlock",
        param: "H6",
      },
      {
        text: "正文",
        command: "formatBlock",
        param: "p",
      },
    ],
  },
  {
    icon: "icon-jiacu",
    command: "bold",
  },
  {
    icon: "icon-bi",
    DragDownProps: [
      {
        text: "红色",
        command: "foreColor",
        param: "#DC143C",
      },
      {
        text: "绿色",
        command: "foreColor",
        param: "#D4F2E7",
      },
      {
        text: "蓝色",
        command: "foreColor",
        param: "#4682B4",
      },
    ],
  },
];
export default defaultConfig;
