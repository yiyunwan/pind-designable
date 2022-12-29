import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { Plugin as importToCDN, Options } from "vite-plugin-cdn-import";
import { visualizer } from "rollup-plugin-visualizer";

const modules: Options["modules"] = [
  {
    name: "react",
    var: "React",
    path: `umd/react.production.min.js`,
  },
  {
    name: "react-dom",
    var: "ReactDOM",
    path: `umd/react-dom.production.min.js`,
  },
  {
    name: "react-is",
    var: "ReactIs",
    path: `umd/react-is.production.min.js`,
  },
  {
    name: "@formily/reactive",
    var: "Formily.Reactive",
    path: "dist/formily.reactive.umd.production.js",
  },
  {
    name: "@formily/path",
    var: "Formily.Path",
    path: "dist/formily.path.umd.production.js",
  },
  {
    name: "@formily/reactive-react",
    var: "Formily.ReactiveReact",
    path: "dist/formily.reactive-react.umd.production.js",
  },
  {
    name: "@formily/grid",
    var: "Formily.Grid",
    path: "dist/formily.grid.umd.production.js",
  },
  {
    name: "@formily/shared",
    var: "Formily.Shared",
    path: "dist/formily.shared.umd.production.js",
  },
  {
    name: "@formily/validator",
    var: "Formily.Validator",
    path: "dist/formily.validator.umd.production.js",
  },
  {
    name: "@formily/core",
    var: "Formily.Core",
    path: "dist/formily.core.umd.production.js",
  },
  {
    name: "@formily/json-schema",
    var: "Formily.JSONSchema",
    path: "dist/formily.json-schema.umd.production.js",
  },
  {
    name: "@formily/react",
    var: "Formily.React",
    path: "dist/formily.react.umd.production.js",
  },
  {
    name: "dayjs",
    var: "dayjs",
    path: "dayjs.min.js",
  },
  {
    name: "@ant-design/icons",
    var: "icons",
    path: "dist/index.umd.min.js",
  },
  {
    name: "antd",
    var: "antd",
    path: "dist/antd-with-locales.min.js",
    css: "dist/reset.css",
  },
  {
    name: "@pind/designable-shared",
    var: "Designable.Shared",
    path: "dist/designable.shared.umd.production.min.js",
  },
  {
    name: "@pind/designable-core",
    var: "Designable.Core",
    path: "dist/designable.core.umd.production.min.js",
  },
  {
    name: "@pind/designable-react",
    var: "Designable.React",
    path: "dist/designable.react.umd.production.min.js",
    css: "dist/designable.react.umd.production.min.css",
  },
  {
    name: "@formily/antd",
    var: "Formily.Antd",
    path: "dist/formily.antd.umd.production.js",
  },
  {
    name: "@pind/designable-react-settings-form",
    var: "Designable.ReactSettingsForm",
    path: "dist/designable.react-settings-form.umd.production.js",
    css: "dist/designable.react-settings-form.umd.production.css",
  },
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer(),
    basicSsl(),
    importToCDN({
      modules,
    }),
  ],
});
