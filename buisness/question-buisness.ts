import { InvestmentTypes as InvestmentTypes, ProductTypes, ProfileTypes, Question, RiskTypes } from "@/services/question-interface";

export const checkProfile = (question: Question): ProfileTypes => {
  var result: Number = 0;

  // Avaliação por idade
  if (question.age && question.age >= 30) {
    result = +result + 3;
  } else if (question.age && question.age >= 18) {
    result = +result + 1;
  }

  // Avaliação por ter investido antes
  if (question.investedBefore && question.investedBefore) {
    result = +result + 2;
  }

  // Avaliação por tempo investido
  if (question.yearsInvesting && question.yearsInvesting >= 3) {
    result = +result + 3;
  } else {
    result = +result + 1;
  }

  // Avaliação por produtos investidos
  if (question.productsInvested) {
    let prods: [ProductTypes] = question.productsInvested;
    prods.map(m => {
      if (m == ProductTypes.RendaFixa) {
        result = +result + 1;
      }
      else if (m == ProductTypes.RendaVariavel) {
        result = +result + 1;
      }
      else if (m == ProductTypes.Acoes) {
        result = +result + 1;
      }
      else if (m == ProductTypes.TesouroDireto) {
        result = +result + 1;
      }
    })
  }

  // Avaliação por valor investido
  if (question.howMuchInvested && question.howMuchInvested >= 100000) {
    result = +result + 3;
  } else if (question.howMuchInvested && (question.howMuchInvested > 10000 && question.howMuchInvested < 100000)) {
    result = +result + 2;
  } else if (question.howMuchInvested && question.howMuchInvested < 10000) {
    result = +result + 1;
  }

  // Avaliação por risco
  if (question.risk && question.risk == RiskTypes.Small) {
    result = +result + 1;
  }
  else if (question.risk && question.risk == RiskTypes.Moderate) {
    result = +result + 3;
  }
  else if (question.risk && question.risk == RiskTypes.Big) {
    result = +result + 5;
  }

  let profile: ProfileTypes = ProfileTypes.Conservative;

  if (Number(result) >= 20) {
    profile = ProfileTypes.Aggressive
  } else if (Number(result) >= 13) {
    profile = ProfileTypes.Moderate
  } else if (Number(result) < 13) {
    profile = ProfileTypes.Conservative
  }

  console.log('==> POINTS:{0} PROFILE:{1}', result, profile);

  return profile;
};

export const investmentSuggestion = (profile: ProfileTypes): InvestmentTypes[] => {
  let investment: InvestmentTypes[] = [];
  switch (profile) {
    case ProfileTypes.Conservative:
      investment.push(InvestmentTypes.DynamicFixedIncome)
      break;
    case ProfileTypes.Moderate:
      investment.push(InvestmentTypes.DynamicFixedIncome)
      investment.push(InvestmentTypes.PostFixedIncome)
      investment.push(InvestmentTypes.RealEstateFunds)
      break;
    case ProfileTypes.Aggressive:
      investment.push(InvestmentTypes.DynamicFixedIncome)
      investment.push(InvestmentTypes.PostFixedIncome)
      investment.push(InvestmentTypes.RealEstateFunds)
      investment.push(InvestmentTypes.MultimarketFunds)
      investment.push(InvestmentTypes.Internacional)
      investment.push(InvestmentTypes.MarketShare)
      investment.push(InvestmentTypes.Alternatives)
      break;
    default:
      break;
  }
  return investment;
}
