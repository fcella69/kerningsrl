import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas";

export default defineConfig({
  projectId: "w0x8ydc6",
  dataset: "production",
  plugins: [deskTool()],
  schema: {
    types: schemaTypes
  }
});
