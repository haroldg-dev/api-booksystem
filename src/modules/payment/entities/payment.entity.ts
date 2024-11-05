export class Payment {
    id: string;         // DynamoDB usually uses string-based IDs
    amount: number;
    date: string;       // DynamoDB stores dates as strings (e.g., ISO format)
    status: string;
}
