export type AccountSummary = {
    accountId: number;
    accountName: string;
    ownerName: string;
    ownerId: number;
    checkingAmount: number;
    savingsAmount: number;
    interestRate: number;
    createdDate: string;
    status: "Active" | "Inactive";
};
