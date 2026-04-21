export function RatingStars({
  rating,
  size = 22,
}: {
  rating: number;
  size?: number;
}) {
  const percentage = (rating / 5) * 100;

  const starSize = size;
  const gap = 1;
  const totalWidth = 5 * starSize + 4 * gap;

  // Build an SVG mask with 5 stars side by side
  const starsPath = Array.from({ length: 5 }, (_, i) => {
    const offset = i * (starSize + gap);
    return `<polygon transform="translate(${offset},0)" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`;
  }).join("");

  const svgMask = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${starSize}" viewBox="0 0 ${totalWidth} ${starSize}">${starsPath}</svg>`,
  );

  return (
    <div
      className="relative bg-gray-300"
      style={{
        width: totalWidth,
        height: starSize,
        WebkitMaskImage: `url("data:image/svg+xml,${svgMask}")`,
        maskImage: `url("data:image/svg+xml,${svgMask}")`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}>
      {/* This div is what shows through the star-shaped mask */}
      <div
        className={`absolute inset-y-0 left-0 ${rating >= 4 ? "bg-primary" : rating < 4 && rating >= 3 ? "bg-amber-300" : rating < 3 && rating >= 2 ? "bg-amber-500" : "bg-destructive "}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
