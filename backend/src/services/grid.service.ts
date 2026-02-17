export function generateGrid() {
  const grid = [];

  for (let lat = -80; lat <= 80; lat += 10) {
    for (let lon = -180; lon < 180; lon += 10) {
      grid.push({ lat, lon });
    }
  }

  return grid;
}
