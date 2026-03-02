import { sanityFetch } from './client';
import {
  categoriesQuery,
  categoryBySlugQuery,
  postBySlugQuery,
  postsByCategoryQuery,
  postsByTagQuery,
  postsQuery
} from './queries';
import type {
  CategoriesQueryResult,
  CategoryBySlugQueryResult,
  PostBySlugQueryResult,
  PostsByCategoryQueryResult,
  PostsByTagQueryResult,
  PostsQueryResult
} from './types';

export const getPosts = () =>
  sanityFetch<PostsQueryResult>({
    query: postsQuery
  });

export const getPostBySlug = (slug: string) =>
  sanityFetch<PostBySlugQueryResult>({
    query: postBySlugQuery,
    params: { slug }
  });

export const getCategoryBySlug = (slug: string) =>
  sanityFetch<CategoryBySlugQueryResult>({
    query: categoryBySlugQuery,
    params: { slug }
  });

export const getPostsByCategory = (slug: string) =>
  sanityFetch<PostsByCategoryQueryResult>({
    query: postsByCategoryQuery,
    params: { slug }
  });

export const getPostsByTag = (tag: string) =>
  sanityFetch<PostsByTagQueryResult>({
    query: postsByTagQuery,
    params: { tag } as Record<string, string>
  });

export const getCategories = () =>
  sanityFetch<CategoriesQueryResult>({
    query: categoriesQuery
  });
