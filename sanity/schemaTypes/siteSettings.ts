import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "footerTagline",
      title: "Footer Tagline",
      description: "Short line shown below the copyright notice",
      type: "string",
    }),
    defineField({
      name: "enquiryFormText",
      title: "Enquiry Form Placeholder Text",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "navigateHeading",
      title: "Footer — Navigate Heading",
      type: "string",
    }),
    defineField({
      name: "contactHeading",
      title: "Footer — Contact Heading",
      type: "string",
    }),
    defineField({
      name: "enquiryButtonLabel",
      title: "Enquiry Button Label",
      type: "string",
    }),
    defineField({
      name: "seoTitleSuffix",
      title: "SEO Title Suffix",
      description: 'Appended to page titles, e.g. "Our Team | CoPTaS"',
      type: "string",
    }),
    defineField({
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
      of: [defineArrayMember({ type: "navLink" })],
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "siteName",
      subtitle: "tagline",
      media: "logo",
    },
  },
});
