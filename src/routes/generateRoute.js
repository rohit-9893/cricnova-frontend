import ROUTE_PATH from "./route.constants";

/**
 * Generate a route with support for path params and query params for CricNovas.
 * Supports both direct keys (e.g. 'LOGIN', 'HOME') and nested keys (e.g. 'MATCH.SELECT_TEAM').
 * 
 * @param {'AUTH'|'APP'} group - Route group ('AUTH' or 'APP')
 * @param {string} key - Key or dot-notation path inside the group enum
 * @param {{
 *   params?: Record<string, string | number>,
 *   query?: Record<string, string | number | boolean | undefined>
 * }} [options]
 * @returns {string} - The final generated route path
 */
export function generateRoute(group, key, options = {}) {
  let basePath = ROUTE_PATH?.[group];

  if (!basePath) {
    console.warn(`Route group "${group}" not found`);
    return "/";
  }

  // Handle nested keys like "MATCH.SELECT_TEAM" or direct keys like "HOME"
  if (key.includes(".")) {
    const keys = key.split(".");
    for (const k of keys) {
      basePath = basePath?.[k];
    }
  } else {
    basePath = basePath?.[key];
  }

  if (!basePath || typeof basePath !== "string") {
    console.warn(`Route key "${key}" not found in group "${group}"`);
    return "/";
  }

  let path = basePath;

  // Add path params as segments if provided
  if (options.params) {
    const paramValues = Object.values(options.params).map((val) =>
      encodeURIComponent(String(val))
    );
    if (paramValues.length) {
      path += `/${paramValues.join("/")}`;
    }
  }

  // Add query string if provided
  if (options.query) {
    const searchParams = new URLSearchParams();
    for (const [queryKey, value] of Object.entries(options.query)) {
      if (value !== undefined) {
        searchParams.append(queryKey, String(value));
      }
    }
    const queryString = searchParams.toString();
    if (queryString) path += `?${queryString}`;
  }

  return path;
}

export default generateRoute;
