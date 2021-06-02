/**
 * 
 * @param userLong 
 * @param userLat 
 * @param longitude 
 * @param latitude 
 * @returns {number} distance in Kilometers
 */
const byHaversine = (userLat: number, userLong: number, latitude: number, longitude: number): number => {
  const R: number = 6371; // Radius of the earth in km
  const dLat: number = deg2rad(latitude - userLat);  // deg2rad below
  const dLon: number = deg2rad(longitude - userLong);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(userLat)) * Math.cos(deg2rad(latitude)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

/**
 * converts degree to radian
 * @param deg 
 * @returns 
 */
const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180)
}

const Distance = {
  byHaversine
};

export default Distance;

