import { defineField, defineType } from 'sanity';

import { slugify } from '../../lib/slug';

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fieldsets: [
    {
      name: 'metadata',
      title: 'Metadata',
      options: {
        collapsible: true,
        collapsed: false
      }
    }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      fieldset: 'metadata',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated at',
      type: 'datetime',
      fieldset: 'metadata'
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.max(300).warning('Keep excerpts under 300 characters.')
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover photo',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Main image used on the post page and in social previews.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Optional, but recommended for accessibility.'
        })
      ],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      fieldset: 'metadata',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      fieldset: 'metadata',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      validation: (Rule) =>
        Rule.custom((tags) => {
          if (!tags) return true;

          if (!Array.isArray(tags)) return 'Tags must be an array.';

          for (const tag of tags) {
            if (typeof tag !== 'string') return 'Tags must be strings.';

            if (slugify(tag) !== tag) return `Tag "${tag}" is not slug compatible.`;
          }

          return true;
        })
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' }
          ]
        },
        { type: 'codeBlock' },
        { type: 'mathBlock' },
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              description: 'Optional, but recommended for accessibility.'
            })
          ]
        }
      ],
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      category: 'category.title'
    },
    prepare({ title, media, category }) {
      return {
        title,
        media,
        subtitle: category ? `Category: ${category}` : 'No category'
      };
    }
  }
});
