// Function to check if the image is cached in the browser

export default function isImageCached(src: string): boolean {
  const image = new Image();

  image.src = src;

  return image.complete;
}
