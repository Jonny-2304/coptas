import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

/** Sanity Studio only exposes SANITY_STUDIO_* vars to the browser bundle */
const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

const singletonTypes = new Set([
  "siteSettings",
  "homePage",
  "teamPage",
  "papersPage",
]);

export default defineConfig({
  name: "coptas",
  title: "CoPTaS Website",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
            S.listItem()
              .title("Home Page")
              .id("homePage")
              .child(
                S.document().schemaType("homePage").documentId("homePage"),
              ),
            S.listItem()
              .title("Team Page")
              .id("teamPage")
              .child(
                S.document().schemaType("teamPage").documentId("teamPage"),
              ),
            S.listItem()
              .title("Papers Page")
              .id("papersPage")
              .child(
                S.document().schemaType("papersPage").documentId("papersPage"),
              ),
            S.divider(),
            S.documentTypeListItem("teamMember").title("Team Members"),
            S.documentTypeListItem("publishedPaper").title("Published Papers"),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
});
