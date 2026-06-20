import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "visionTitle",
      title: "Vision — Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "visionEyebrow",
      title: "Vision — Eyebrow",
      type: "string",
      initialValue: "What we stand for",
    }),
    defineField({
      name: "visionItems",
      title: "Vision — Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "visionItem",
          fields: [
            defineField({
              name: "lead",
              title: "Lead",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "text",
              title: "Text",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "lead", subtitle: "text" },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "aimTitle",
      title: "Aim — Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "aimDescription",
      title: "Aim — Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "purposeTitle",
      title: "Purpose — Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "purposeDescription",
      title: "Purpose — Description",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "objectivesTitle",
      title: "Objectives — Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "objectivesEyebrow",
      title: "Objectives — Eyebrow",
      type: "string",
      initialValue: "What we do",
    }),
    defineField({
      name: "objectivesItems",
      title: "Objectives — Items",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "ctaTitle",
      title: "CTA Banner — Title",
      type: "string",
      initialValue: "Explore our work",
    }),
    defineField({
      name: "ctaDescription",
      title: "CTA Banner — Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "heroButtons",
      title: "Hero — Buttons",
      type: "array",
      of: [defineArrayMember({ type: "ctaButton" })],
    }),
    defineField({
      name: "ctaButtons",
      title: "CTA Banner — Buttons",
      type: "array",
      of: [defineArrayMember({ type: "ctaButton" })],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home Page" };
    },
  },
});
