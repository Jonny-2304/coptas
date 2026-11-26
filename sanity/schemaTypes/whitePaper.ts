import { defineField, defineType } from "sanity";
import { monthField } from "./objects/monthField";

export const whitePaper = defineType({
  name: "whitePaper",
  title: "Non-peer-reviewed / White Paper",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authors",
      title: "Authors",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (rule) => rule.required().min(1900).max(2100),
    }),
    monthField,
    defineField({
      name: "journal",
      title: "Publication or Publisher",
      type: "string",
      description:
        "e.g. magazine, trade journal, or the organisation that published it.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "externalLink",
      title: "External Link",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "abstract",
      title: "Abstract",
      type: "text",
      rows: 5,
    }),
  ],
  orderings: [
    {
      title: "Date (Newest First)",
      name: "dateDesc",
      by: [
        { field: "year", direction: "desc" },
        { field: "month", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "journal",
      year: "year",
    },
    prepare({ title, subtitle, year }) {
      return {
        title,
        subtitle: `${year} · ${subtitle}`,
      };
    },
  },
});
