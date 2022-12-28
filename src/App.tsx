import React, { useMemo } from "react";
import { createRoot } from "react-dom/client";
import {
  Designer,
  DesignerToolsWidget,
  ViewToolsWidget,
  Workspace,
  OutlineTreeWidget,
  HistoryWidget,
  StudioPanel,
  CompositePanel,
  WorkspacePanel,
  ToolbarPanel,
  ViewportPanel,
  ViewPanel,
  SettingsPanel,
  ComponentTreeWidget,
  ResourceListWidget,
} from "@pind/designable-react";
import {
  SettingsForm,
  setNpmCDNRegistry,
} from "@pind/designable-react-settings-form";
import {
  createDesigner,
  GlobalRegistry,
  Shortcut,
  KeyCode,
} from "@pind/designable-core";
import {
  LogoWidget,
  ActionsWidget,
  PreviewWidget,
  SchemaEditorWidget,
  MarkupSchemaWidget,
} from "./widgets";
import { saveSchema } from "./service";
import { sources } from "@pind/designable-formily-antd";
import { Alert } from "antd";
setNpmCDNRegistry("//unpkg.com");
const { ErrorBoundary } = Alert;
GlobalRegistry.registerDesignerLocales({
  "zh-CN": {
    sources: {
      Inputs: "输入控件",
      Layouts: "布局组件",
      Arrays: "自增组件",
      Displays: "展示组件",
    },
  },
  "en-US": {
    sources: {
      Inputs: "Inputs",
      Layouts: "Layouts",
      Arrays: "Arrays",
      Displays: "Displays",
    },
  },
  "ko-KR": {
    sources: {
      Inputs: "입력",
      Layouts: "레이아웃",
      Arrays: "배열",
      Displays: "디스플레이",
    },
  },
});

const App = () => {
  const engine = useMemo(
    () =>
      createDesigner({
        shortcuts: [
          new Shortcut({
            codes: [
              [KeyCode.Meta, KeyCode.S],
              [KeyCode.Control, KeyCode.S],
            ],
            handler(ctx) {
              saveSchema(ctx.engine);
            },
          }),
        ],
        rootComponentName: "Form",
      }),
    []
  );
  return (
    <Designer engine={engine}>
      <StudioPanel logo={<LogoWidget />} actions={<ActionsWidget />}>
        <CompositePanel>
          <CompositePanel.Item title="panels.Component" icon="Component">
            <ResourceListWidget sources={Object.values({ ...sources })} />
          </CompositePanel.Item>
          <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
            <OutlineTreeWidget />
          </CompositePanel.Item>
          <CompositePanel.Item title="panels.History" icon="History">
            <HistoryWidget />
          </CompositePanel.Item>
        </CompositePanel>
        <Workspace id="form">
          <WorkspacePanel>
            <ErrorBoundary>
              <ToolbarPanel>
                <DesignerToolsWidget />
                <ViewToolsWidget
                  use={["DESIGNABLE", "JSONTREE", "MARKUP", "PREVIEW"]}
                />
              </ToolbarPanel>
              <ViewportPanel style={{ height: "100%" }}>
                <ViewPanel type="DESIGNABLE">
                  {() => <ComponentTreeWidget components={{ ...sources }} />}
                </ViewPanel>
                <ViewPanel type="JSONTREE" scrollable={false}>
                  {(tree, onChange) => (
                    <SchemaEditorWidget tree={tree} onChange={onChange} />
                  )}
                </ViewPanel>
                <ViewPanel type="MARKUP" scrollable={false}>
                  {(tree) => <MarkupSchemaWidget tree={tree} />}
                </ViewPanel>
                <ViewPanel type="PREVIEW">
                  {(tree) => <PreviewWidget tree={tree} />}
                </ViewPanel>
              </ViewportPanel>
            </ErrorBoundary>
          </WorkspacePanel>
        </Workspace>
        <SettingsPanel title="panels.PropertySettings">
          <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
        </SettingsPanel>
      </StudioPanel>
    </Designer>
  );
};

export default App;
