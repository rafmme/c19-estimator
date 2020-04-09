import {
  determineNumberOfInfectionFactor,
  bedSpaceByRequestedTimeComputation,
  dollarsInFlightComputation
} from './helpers';

/**
 * @description A novelty COVID-19 infections estimator function
 * @param {Object} data
 * @returns {Object}
 */
const covid19ImpactEstimator = (data) => {
  const {
    reportedCases,
    totalHospitalBeds
  } = data;
  const factor = determineNumberOfInfectionFactor(data);

  const currentlyInfected = Number.parseInt(reportedCases * 10, 10);
  const severeImpactCurrentlyInfected = Number.parseInt(reportedCases * 50, 10);

  const infectionsByRequestedTime = Number.parseInt(currentlyInfected * factor, 10);
  const severeImpactInfectionsByRequestedTime = Number.parseInt(
    severeImpactCurrentlyInfected * factor, 10
  );

  const severeCasesByRequestedTime = Number.parseInt(0.15 * infectionsByRequestedTime, 10);
  const severeCasesByRequestedTimeForSevereImpact = Number.parseInt(
    0.15 * severeImpactInfectionsByRequestedTime, 10
  );

  return {
    data,
    impact: {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime:
        bedSpaceByRequestedTimeComputation(
          totalHospitalBeds, severeCasesByRequestedTime
        ),
      casesForICUByRequestedTime: Number.parseInt(0.05 * infectionsByRequestedTime, 10),
      casesForVentilatorsByRequestedTime: Number.parseInt(0.02 * infectionsByRequestedTime, 10),
      dollarsInFlight: dollarsInFlightComputation(data, infectionsByRequestedTime)
    },
    severeImpact: {
      currentlyInfected: severeImpactCurrentlyInfected,
      infectionsByRequestedTime: severeImpactInfectionsByRequestedTime,
      severeCasesByRequestedTime: severeCasesByRequestedTimeForSevereImpact,
      hospitalBedsByRequestedTime:
        bedSpaceByRequestedTimeComputation(
          totalHospitalBeds, severeCasesByRequestedTimeForSevereImpact
        ),
      casesForICUByRequestedTime: Number.parseInt(
        0.05 * severeImpactInfectionsByRequestedTime, 10
      ),
      casesForVentilatorsByRequestedTime: Number.parseInt(
        0.02 * severeImpactInfectionsByRequestedTime, 10
      ),
      dollarsInFlight: dollarsInFlightComputation(data, severeImpactInfectionsByRequestedTime)
    }
  };
};

export default covid19ImpactEstimator;
