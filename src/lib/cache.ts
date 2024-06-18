// we are handling two types of caching

// this is for data caching and all thing built into nextjs
import { unstable_cache as nextCache } from "next/cache";

// this cache is for request memoization
import { cache as reactCache } from "react";

type Callback = (...args: any[]) => Promise<any>;

export function cache<T extends Callback>(
  cb: T,
  keyParts: string[],
  options: { revalidate?: number | false; tags?: string[] } = {}
) {
  //what we're doing here is cache callback function using react
  // and then passing options , cached func, keyparts to nextcache

  //the reason we're doing this helper func is so I don't always have to import
  //both of these cache in my func and wrap both of them,
  //this makes it more confusing and difficult to work with.

  return nextCache(reactCache(cb), keyParts, options);
}
