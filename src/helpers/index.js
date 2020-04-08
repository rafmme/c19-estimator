/**
 * @description Function for normalising the duration input (months / weeks ) to days
 * @param {Object} data the input data object
 * @returns {Number} returns the number of days
 */
const normaliseDurationToDays = ({ periodType, timeToElapse }) => {
  let numberOfDays;

  switch (periodType) {
    case 'weeks':
      numberOfDays = timeToElapse * 7;
      break;

    case 'months':
      numberOfDays = timeToElapse * 30;
      break;

    default:
      numberOfDays = timeToElapse;
      break;
  }

  return numberOfDays;
};

/**
 * @description Function to determine the number for generating the infectionsByRequestedTime
 * @param {*} data the input data object
 */
const determineNumberOfInfectionFactor = (data) => {
  const numberOfDays = normaliseDurationToDays(data);
  const factor = Number.parseInt(numberOfDays / 3, 10);

  return 2 ** factor;
};

export {
  normaliseDurationToDays,
  determineNumberOfInfectionFactor
};
