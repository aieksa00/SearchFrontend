import { TransactionStatus } from "./enums/transaction-status";

export interface BankTransactionDto {
    paymentId: number;
    amount: number;
    merchantOrderId: number;
    merchantTimestamp: Date;
    acquirerOrderId?: number;
    acquirerTimestamp?: Date;
    status: TransactionStatus;
};

export interface CryptoTransactionDto {
    merchantOrderId: number;
    merchantTimestamp: Date;
    amount: number;
    agencyWalletId?: string;
    buyerWalletId?: string;
    transactionHash?: string;
    status: TransactionStatus;
}

export interface PayPalTransactionDto {
    id: string;
    orderId: string;
    paypalOrderId: string;
    agencyId: string;
    amount: number;
    status: string;
    payerId?: string;
    createdAt: Date;
    updatedAt?: Date;
}