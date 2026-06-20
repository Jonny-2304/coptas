import { defineField, defineType } from "sanity";

export const publishedPaper = defineType({
  name: "publishedPaper",
  title: "Published Paper",
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
    defineField({
      name: "journal",
      title: "Journal or Conference",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "externalLink",
      title: "External Link",
      type: "url",
      validation: (rule) =>
        rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "abstract",
      title: "Abstract",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Year (Newest First)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
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
