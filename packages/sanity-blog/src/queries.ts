import { defineQuery } from 'groq';

export const postsQuery = defineQuery(`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    updatedAt,
    excerpt,
    coverImage,
    category->{
      _id,
      title,
      "slug": slug.current
    },
    tags
  }
`);

export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    updatedAt,
    excerpt,
    coverImage,
    "coverImageLqip": coverImage.asset->metadata.lqip,
    "coverImageDimensions": coverImage.asset->metadata.dimensions{
      width,
      height,
      aspectRatio
    },
    category->{
      _id,
      title,
      "slug": slug.current
    },
    tags,
    body[]{
      ...,
      _type == "image" => {
        ...,
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions{
          width,
          height,
          aspectRatio
        }
      }
    }
  }
`);

export const categoryBySlugQuery = defineQuery(`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description
  }
`);

export const postsByCategoryQuery = defineQuery(`
  *[_type == "post" && category->slug.current == $slug] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    updatedAt,
    excerpt,
    coverImage,
    category->{
      _id,
      title,
      "slug": slug.current
    },
    tags
  }
`);

export const postsByTagQuery = defineQuery(`
  *[_type == "post" && $tag in tags] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    updatedAt,
    excerpt,
    coverImage,
    category->{
      _id,
      title,
      "slug": slug.current
    },
    tags
  }
`);

export const categoriesQuery = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`);
