

const roundRating = (rating) => {
    const base = Math.floor(rating);
    const decimal = rating - base;
  
    if (decimal < 0.4) {
      return base;
    } else if (decimal < 0.9) {
      return base + 0.5;
    } else {
      return base + 1;
    }
  };
  
  export default roundRating;
  