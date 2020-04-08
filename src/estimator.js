const covid19ImpactEstimator = (data) => {
    
    const { reportedCases, 
            timeToElapse, 
            periodType, 
            totalHospitalBeds 
            } = data
    let factor;

    if(periodType === "days") {
        factor = Math.floor(timeToElapse / 3)
    } else if(periodType === "weeks") {
        factor = Math.floor(timeToElapse * 7 / 3)
    } else {
        factor = Math.floor(timeToElapse * 30 / 3)
    }
 
    // impact estimations
    const impactCurrentlyInfected = reportedCases * 10 
    const impactInfectionsByRequestedTime = impactCurrentlyInfected * Math.pow(2, factor)
    const casesByRequestedTime = impactInfectionsByRequestedTime * 0.15
    const impactHospitalBedsByRequestedTime = (totalHospitalBeds * 0.65) - casesByRequestedTime


    // severe impact estimations
    const severeImpactCurrentlyInfected = reportedCases * 50
    const severeImpactInfectionsByRequestedTime = severeImpactCurrentlyInfected * Math.pow(2, factor)
    const severeCasesByRequestedTime = severeImpactInfectionsByRequestedTime * 0.15
    const hospitalBedsByRequestedTime = (totalHospitalBeds * 0.65) - severeCasesByRequestedTime


    const impact = {
        currentlyInfected: impactCurrentlyInfected,
        infectionsByRequestedTime: impactInfectionsByRequestedTime,
        severeCasesByRequestedTime: casesByRequestedTime,
        hospitalBedsByRequestedTime: impactHospitalBedsByRequestedTime
    }

    const severeImpact = {
        currentlyInfected: severeImpactCurrentlyInfected,
        infectionsByRequestedTime: severeImpactInfectionsByRequestedTime,
        severeCasesByRequestedTime,
        hospitalBedsByRequestedTime
    }

    return {
        data,
        impact,
        severeImpact
    }
};

export default covid19ImpactEstimator;
