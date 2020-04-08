const covid19ImpactEstimator = (data) => {

    const { reportedCases, 
            timeToElapse, 
            periodType, 
            totalHospitalBeds,
            region
            } = data
    let factor, period;

    if(periodType === "days") {
        factor = Math.floor(timeToElapse / 3)
        period = timeToElapse
    } else if(periodType === "weeks") {
        factor = Math.floor(timeToElapse * 7 / 3)
        period = timeToElapse * 7
    } else {
        factor = Math.floor(timeToElapse * 30 / 3)
        period = timeToElapse * 30
    }
 
    // impact estimations
    const impactCurrentlyInfected = reportedCases * 10 
    const impactInfectionsByRequestedTime = impactCurrentlyInfected * Math.pow(2, factor)
    const casesByRequestedTime = impactInfectionsByRequestedTime * 0.15
    const impactHospitalBedsByRequestedTime = (totalHospitalBeds * 0.65) - casesByRequestedTime
    const impactCasesForICUByRequestedTime = impactInfectionsByRequestedTime * 0.5
    const impactCasesForVentilatorsByRequestedTime  = impactInfectionsByRequestedTime * 0.2
    const impactDollarsInFlight = impactInfectionsByRequestedTime * region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD * period

    // severe impact estimations
    const severeImpactCurrentlyInfected = reportedCases * 50
    const severeImpactInfectionsByRequestedTime = severeImpactCurrentlyInfected * Math.pow(2, factor)
    const severeCasesByRequestedTime = severeImpactInfectionsByRequestedTime * 0.15
    const hospitalBedsByRequestedTime = (totalHospitalBeds * 0.65) - severeCasesByRequestedTime
    const casesForICUByRequestedTime = severeImpactInfectionsByRequestedTime * 0.5
    const casesForVentilatorsByRequestedTime  = severeImpactInfectionsByRequestedTime * 0.2
    const dollarsInFlight = severeImpactInfectionsByRequestedTime * region.avgDailyIncomePopulation * region.avgDailyIncomeInUSD * period


    const impact = {
        currentlyInfected: impactCurrentlyInfected,
        infectionsByRequestedTime: impactInfectionsByRequestedTime,
        severeCasesByRequestedTime: casesByRequestedTime,
        hospitalBedsByRequestedTime: impactHospitalBedsByRequestedTime,
        casesForICUByRequestedTime: impactCasesForICUByRequestedTime,
        casesForVentilatorsByRequestedTime: impactCasesForVentilatorsByRequestedTime,
        dollarsInFlight: impactDollarsInFlight
    }

    const severeImpact = {
        currentlyInfected: severeImpactCurrentlyInfected,
        infectionsByRequestedTime: severeImpactInfectionsByRequestedTime,
        severeCasesByRequestedTime,
        hospitalBedsByRequestedTime,
        casesForICUByRequestedTime,
        casesForVentilatorsByRequestedTime,
        dollarsInFlight
    }

    return {
        data,
        impact,
        severeImpact
    }
};

export default covid19ImpactEstimator;
