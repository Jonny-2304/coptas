import { defineField, defineType } from "sanity";

export const teamPage = defineType({
  name: "teamPage",
  title: "Team Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Intro Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Team Page" };
    },
  },
});
