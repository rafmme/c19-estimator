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

  const currentlyInfected = reportedCases * 10;
  const severeImpactCurrentlyInfected = reportedCases * 50;

  const infectionsByRequestedTime = currentlyInfected * factor;
  const severeImpactInfectionsByRequestedTime = severeImpactCurrentlyInfected * factor;

  const severeCasesByRequestedTime = 0.15 * infectionsByRequestedTime;
  const severeCasesByRequestedTimeForSevereImpact = 0.15 * severeImpactInfectionsByRequestedTime;

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
      casesForICUByRequestedTime: 0.05 * infectionsByRequestedTime,
      casesForVentilatorsByRequestedTime: 0.02 * infectionsByRequestedTime,
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
      casesForICUByRequestedTime: 0.05 * severeImpactInfectionsByRequestedTime,
      casesForVentilatorsByRequestedTime: 0.02 * severeImpactInfectionsByRequestedTime,
      dollarsInFlight: dollarsInFlightComputation(data, severeImpactInfectionsByRequestedTime)
    }
  };
};

export default covid19ImpactEstimator;
