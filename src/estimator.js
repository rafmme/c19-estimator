import {
  determineNumberOfInfectionFactor,
  bedSpaceByRequestedTimeComputation
} from './helpers';

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
        )
    },
    severeImpact: {
      currentlyInfected: severeImpactCurrentlyInfected,
      infectionsByRequestedTime: severeImpactInfectionsByRequestedTime,
      severeCasesByRequestedTime: severeCasesByRequestedTimeForSevereImpact,
      hospitalBedsByRequestedTime:
        bedSpaceByRequestedTimeComputation(
          totalHospitalBeds, severeCasesByRequestedTimeForSevereImpact
        )
    }
  };
};

export default covid19ImpactEstimator;
