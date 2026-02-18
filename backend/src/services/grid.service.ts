export function generateGrid() {
  const STEP = 8;
  const grid = [];

  for (let lat = -80; lat <= 80; lat += STEP) {
    for (let lon = -180; lon < 180; lon += STEP) {
      grid.push({ lat, lon });
    }
  }

  return grid;
}
