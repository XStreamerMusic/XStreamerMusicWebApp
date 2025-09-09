/**
 * Rescale width and height proportionally to fit a given max width
 * @param {number} width - Original width in pixels
 * @param {number} height - Original height in pixels
 * @param {number} maxWidthRem - Max width for scaled size (in rem)
 * @param {number} base - Pixels per rem (default 16)
 * @returns {{width: number, height: number}} - Scaled dimensions in rem
 */
export function rescale(width, height, maxWidthRem, base = 16) {
  const maxWidthPx = maxWidthRem * base;
  const scale = maxWidthPx / width;

  return {
    width: maxWidthRem,
    height: (height * scale) / base,
  };
}
