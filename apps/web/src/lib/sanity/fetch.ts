import { client } from "./client";

export async function sanityFetch<T>(
  query: string,
  params: Record<string, any> = {}
) {
  return client.fetch<T>(query, params, {
    next: { revalidate: 60 },
  });
}
