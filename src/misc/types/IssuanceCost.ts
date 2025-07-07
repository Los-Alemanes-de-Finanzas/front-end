export interface IssuanceCost {
    id: number,
    bondId: number,
    premium: number,
    structuringCost: number,
    whoPaysStructuring: string,
    placementCost: number,
    whoPaysPlacement: string,
    flotationCost: number,
    whoPaysFloatation: string,
    cavaliFee: number,
    whoPaysCavali: string,
    initialCostIssuer: number,
    initialCostBondholder: number
}