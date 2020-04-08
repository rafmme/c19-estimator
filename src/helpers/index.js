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
 * @param {Object} data the input data object
 * @returns {Number}
 */
const determineNumberOfInfectionFactor = (data) => {
  const numberOfDays = normaliseDurationToDays(data);
  const factor = Number.parseInt(numberOfDays / 3, 10);

  return 2 ** factor;
};

/**
 * @description Function that computes the available bed space for severe patients
 * @param {Number} totalHospitalBeds
 * @param {Number} severeCases
 * @returns {Number}
 */
const bedSpaceByRequestedTimeComputation = (totalHospitalBeds, severeCases) => {
  const availableBedSpace = totalHospitalBeds * 0.35;
  return availableBedSpace - severeCases;
};

/**
 * @description Function that computes the amount of dollars lost
 * @param {Object} data
 * @param {Number} infectionsByRequestedTime
 * @returns {Number}
 */
const dollarsInFlightComputation = (data, infectionsByRequestedTime) => {
  const dayPeriod = normaliseDurationToDays(data);
  const {
    region: {
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation
    }
  } = data;

  const dollarsInFlight = infectionsByRequestedTime * avgDailyIncomePopulation
    * avgDailyIncomeInUSD * dayPeriod;

  return dollarsInFlight;
};

export {
  normaliseDurationToDays,
  determineNumberOfInfectionFactor,
  bedSpaceByRequestedTimeComputation,
  dollarsInFlightComputation
};
