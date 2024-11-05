export function extractImageName(path: string): string {
  return path.split("/").pop() || path;
}
