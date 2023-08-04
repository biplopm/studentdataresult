/**
 * Create Alert
 */
const createAlert = (msg, type = "danger") => {
  return `<p class="alert alert-${type} d-flex justify-content-between">${msg}
        <button class="btn-close" data-bs-dismiss="alert"></button>
      </p>`;
};

/**
 *Number Check function
 */

const isNumber = (num) => {
  const pattern = /^[0-9]{6,}$/;
  return pattern.test(num);
};

/**
 * Send Data to LS
 */
const sendDataLS = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

/**
 * Get Data from LS
 */
const getDataLS = (key) => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  }
  return [];
};

/**
 * Time Ago
 */
const timeAgo = (timestamp) => {
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;
  const MONTH = 30 * DAY;
  const YEAR = 365 * DAY;

  const timeElapsed = Date.now() - timestamp;

  if (timeElapsed < MINUTE) {
    return `${Math.floor(timeElapsed / SECOND)} seconds ago`;
  } else if (timeElapsed < HOUR) {
    return `${Math.floor(timeElapsed / MINUTE)} minutes ago`;
  } else if (timeElapsed < DAY) {
    return `${Math.floor(timeElapsed / HOUR)} hours ago`;
  } else if (timeElapsed < WEEK) {
    return `${Math.floor(timeElapsed / DAY)} days ago`;
  } else if (timeElapsed < MONTH) {
    return `${Math.floor(timeElapsed / WEEK)} weeks ago`;
  } else if (timeElapsed < YEAR) {
    return `${Math.floor(timeElapsed / MONTH)} months ago`;
  } else {
    return `${Math.floor(timeElapsed / YEAR)} years ago`;
  }
};

// id function
const getRandomId = (length) => {
  const cryptoObj = window.crypto || window.msCrypto; // Modern browsers use 'crypto', and IE/Edge uses 'msCrypto'.

  // Check if the cryptographic object is available and has the 'getRandomValues' method.
  if (!cryptoObj || !cryptoObj.getRandomValues) {
    throw new Error(
      "Your browser does not support secure random number generation."
    );
  }

  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const randomArray = new Uint16Array(length);

  // Generate random values and fill the array.
  cryptoObj.getRandomValues(randomArray);

  let result = "";
  for (let i = 0; i < length; i++) {
    result += charset[randomArray[i] % charset.length];
  }
  return result;
};
