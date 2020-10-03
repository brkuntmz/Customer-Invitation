/* 
  Calculate great circle distance based on the Wiki formula
*/
export function getGreatCircleDistance(
  { lat: lat1, lon: lon1 },
  { lat: lat2, lon: lon2 }
) {
  const R = 6371; // Earth's radius in km

  if (!lat1 || !lon1 || !lat2 || !lon2) {
    throw new Error("Points are missing");
  }

  // validate points passed to function
  if (!isValidPoints(lat1, lon1, lat2, lon2)) {
    throw new Error("Points are not valid!");
  }

  let angleInRadians = calculateAngle(lat1, lon1, lat2, lon2);

  // calc the distance
  let d = R * angleInRadians; // Distance in km
  return d;
}

/* 
    Check whether lat is between -90.0 < lat < 90.0
    Check whether lon is between -180.0 < lon < 180.0
*/
const isValidPoints = (lat1, lon1, lat2, lon2) => {
  return (
    lat1 > -90.0 &&
    lat1 < 90.0 &&
    lon1 > -180.0 &&
    lon1 < 180.0 &&
    lat2 > -90.0 &&
    lat2 < 90.0 &&
    lon2 > -180.0 &&
    lon2 < 180.0
  );
};

/* 
  Calculate central angle
*/
const calculateAngle = (lat1, lon1, lat2, lon2) => {
  // degree to rad conversion
  let rLat1 = deg2Rad(lat1);
  let rLat2 = deg2Rad(lat2);
  let rLonDelta = deg2Rad(Math.abs(lon2 - lon1));

  // apply the angle formula from wiki page
  return Math.acos(
    Math.sin(rLat1) * Math.sin(rLat2) +
      Math.cos(rLat1) * Math.cos(rLat2) * Math.cos(rLonDelta)
  );
};

// conversion formulas
export const deg2Rad = (deg) => deg * (Math.PI / 180);
export const rad2Deg = (rad) => rad * (180 / Math.PI);
