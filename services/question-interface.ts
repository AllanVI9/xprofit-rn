import { Timestamp } from "firebase/firestore";

export interface Question {
  userId: string;
  age?: number;
  investedBefore?: boolean;
  yearsInvesting?: number;
  productsInvested?: [ProductTypes];
  howMuchInvested?: number;
  risk?: RiskTypes;
  profile?: ProfileTypes;
  updatedAt?: Timestamp;
}

export enum ProductTypes {
  RendaFixa = 'RendaFixa',
  RendaVariavel = 'RendaVariavel',
  Acoes = 'Acoes',
  TesouroDireto = 'TesouroDireto',
}

export enum RiskTypes {
  Small = 'Pequeno',
  Moderate = 'Moderado',
  Big = 'Grande'
}

export enum ProfileTypes {
  Conservative = 'Conservador',
  Moderate = 'Moderado',
  Aggressive = 'Agressivo'
}

export enum InvestmentTypes {
  DynamicFixedIncome = 'Renda Fixa Dinâmica',
  PostFixedIncome = 'Renda Fixa Pós',
  RealEstateFunds = 'Fundos Imobiliários',
  MultimarketFunds = 'Fundos Multimercado',
  Internacional = 'Internacional',
  MarketShare = 'Ações',
  Alternatives = 'Alternativos',
}
