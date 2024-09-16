export interface ContractDto {
    id: string;
    signerName: string;
    signerSurname: string;
    governmentName: string;
    administrationLevel: string;
    address: string;
    fileName: string;
    geoPoint: {
        x:number,
        y:number
    };
};

export interface LawDto {
    id: string;
    content: string;
    fileName: string;
};