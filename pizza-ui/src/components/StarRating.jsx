function StarRating({ average = 0, count = 0, size = "ph-stars" }) {
  const rounded = Math.round(average);

  if (!count) {
    return <span className="ph-rating-count">No reviews yet</span>;
  }

  return (
    <span>
      <span className={size}>
        {"★".repeat(rounded)}
        {"☆".repeat(5 - rounded)}
      </span>{" "}
      <span className="ph-rating-count">
        {average.toFixed(1)} ({count})
      </span>
    </span>
  );
}

export default StarRating;
