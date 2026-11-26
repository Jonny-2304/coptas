import { defineField } from "sanity";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Optional publication month, used to sort papers within the same year. */
export const monthField = defineField({
  name: "month",
  title: "Month",
  type: "number",
  description: "Optional. Used to order papers published in the same year.",
  options: {
    list: MONTHS.map((title, index) => ({ title, value: index + 1 })),
  },
  validation: (rule) => rule.min(1).max(12).integer(),
});
