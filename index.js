import { API_KEY } from "./config.js";

function getLocation(ipAddress) {
  const url = `http://api.ipstack.com/${ipAddress}?access_key=${API_KEY}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      const { latitude, longitude } = data;
      if (latitude && longitude) {
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      } else {
        console.log('Location data not found.');
      }
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`);
    });
}

if (process.argv.length !== 3) {
  console.log('Usage: node get_location.js <IP_ADDRESS>');
  process.exit(1);
}

const ipAddress = process.argv[2];
getLocation(ipAddress);
