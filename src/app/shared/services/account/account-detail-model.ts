export type AccountActivity = {
    type: "deposit" | "withdrawal";
    amount: number;
    date: string;
};

export type AccountDetail = {
    accountId: number;
    accountName: string;
    ownerName: string;
    ownerId: number;
    checkingAmount: number;
    savingsAmount: number;
    interestRate: number;
    createdDate: string;
    status: "Active" | "Inactive";
    ownerBirthdate: string | null;
    ficoScore: number;
    activityTimeline: AccountActivity[];
};
