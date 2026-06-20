export const siteSettingsQuery = `
  *[_id == "siteSettings"][0] {
    siteName,
    tagline,
    contactEmail,
    footerText,
    footerTagline,
    enquiryFormText,
    navigateHeading,
    contactHeading,
    enquiryButtonLabel,
    seoTitleSuffix,
    navLinks[] {
      label,
      href
    },
    logo {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
      },
      alt
    }
  }
`;

export const homePageQuery = `
  *[_id == "homePage"][0] {
    visionTitle,
    visionEyebrow,
    visionItems[] {
      lead,
      text
    },
    aimTitle,
    aimDescription,
    purposeTitle,
    purposeDescription,
    objectivesTitle,
    objectivesEyebrow,
    objectivesItems,
    ctaTitle,
    ctaDescription,
    heroButtons[] {
      label,
      href,
      variant
    },
    ctaButtons[] {
      label,
      href,
      variant
    }
  }
`;

export const teamPageQuery = `
  *[_id == "teamPage"][0] {
    title,
    description,
    seoTitle,
    seoDescription
  }
`;

export const papersPageQuery = `
  *[_id == "papersPage"][0] {
    title,
    description,
    seoTitle,
    seoDescription
  }
`;

export const teamMembersQuery = `
  *[_type == "teamMember"] | order(displayOrder asc) {
    _id,
    name,
    role,
    photo {
      asset,
      alt
    },
    areasOfInterest,
    biography,
    displayOrder
  }
`;

export const publishedPapersQuery = `
  *[_type == "publishedPaper"] | order(year desc, title asc) {
    _id,
    title,
    authors,
    year,
    journal,
    externalLink,
    abstract,
    featured
  }
`;
