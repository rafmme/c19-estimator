import { determineNumberOfInfectionFactor } from './helpers';

const covid19ImpactEstimator = (data) => {
  const { reportedCases } = data;

  return {
    data,
    impact: {
      currentlyInfected: reportedCases * 10,
      infectionsByRequestedTime: (reportedCases * 10) * determineNumberOfInfectionFactor(data)
    },
    severeImpact: {
      currentlyInfected: reportedCases * 50,
      infectionsByRequestedTime: (reportedCases * 50) * determineNumberOfInfectionFactor(data)
    }
  };
};

export default covid19ImpactEstimator;
