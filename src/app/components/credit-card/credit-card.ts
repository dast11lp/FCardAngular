export type CreditCard = {
	id: number | undefined;
	holder: string;
	cardNumber: string;
	dueDate: string;
	cvv: string;
	bankAccountId: number | undefined;
};