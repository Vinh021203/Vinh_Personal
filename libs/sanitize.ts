export function sanitizeHtml(input = "") {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/\s+on\w+\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi, "")
    .replace(/\s+(href|src)\s*=\s*("|')\s*javascript:[\s\S]*?\2/gi, "")
    .replace(/\s+style\s*=\s*(".*?expression\(.*?\).*?"|'.*?expression\(.*?\).*?')/gi, "");
}
