
type currencyRate = {
    ccy: string,
    base_ccy: string,
    buy: string,
    sale: string
}

type callback = (sum: number, currencyAccount: string, currencyRate: currencyRate[]) => number;

class DebitAccount {
    ownMoney: number
    currency: string
    isActive: boolean
    dateActive: string
    constructor(sum: number, currency: string, isActive: boolean, dateActive: string) {
        this.currency = currency;
        this.ownMoney = sum;
        this.isActive = isActive;
        this.dateActive = dateActive;
    }
}


class CreditAccount extends DebitAccount {
    creditMoney: number
    limit: number
    constructor(ownMoney: number, creditMoney: number, limit: number, currency: string, isActive: boolean, dateActive: string) {
        super(ownMoney, currency, isActive, dateActive)
        this.creditMoney = creditMoney;
        this.limit = limit;
    }
}

class Client {
    firstName: string
    lastName: string
    isActive: boolean;
    date: string;
    debit: DebitAccount[] = [];
    credit: CreditAccount[] = [];
    constructor(firstName: string, lastName: string, isActive: boolean, date: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.isActive = isActive;
        this.date = date;
    }

    addAccount(account: CreditAccount) {
        if (account.hasOwnProperty('limit')) {

            if (account.ownMoney < 0) {
                throw new Error("exceeded credit limit");
            }

            let creditMoney: number;
            let ownMoney = account.ownMoney - account.limit;

            if (ownMoney >= 0) {
                creditMoney = account.limit;
            } else {
                creditMoney = account.limit + ownMoney;
            }

            this.credit.push(new CreditAccount(ownMoney, creditMoney, account.limit, account.currency, account.isActive, account.dateActive))

        } else {

            if (account.ownMoney < 0) {
                throw new Error("debit account must be greater than zero");
            }

            this.debit.push(new DebitAccount(account.ownMoney, account.currency, account.isActive, account.dateActive))
        }
    }
}

let bank: Client[] = [];

function createNewClient(firstName: string, lastName: string, isActive: boolean, date: string, ...rest: (CreditAccount | DebitAccount)[]) {
    let newClient = new Client(firstName, lastName, isActive, date);
    let clientArgs = arguments;

    for (let i = 4; i < clientArgs.length; i++) {
        newClient.addAccount(clientArgs[i]);
    }

    bank.push(newClient);
}

function rate(sum: number, currencyAccount: string, currencyRate: currencyRate[]) {

    if ((sum > 0) && (currencyAccount === 'USD')) {
        return sum;
    }

    if ((sum > 0) && (currencyAccount === 'UAH')) {
        return sum / Number(currencyRate[0].sale);
    }

    if (sum > 0) {
        let uah = 0;

        for (i = 0; i < currencyRate.length; i++) {
            if (currencyAccount === currencyRate[i].ccy) {
                uah = sum * Number(currencyRate[i].buy);
            }
        }

        return uah / Number(currencyRate[0].sale);
    }

    return 0;
}

function calculatSumBankUsd(rate:currencyRate[], callback:callback) {
    let sumBankUsd = 0;

    for (let i = 0; i < bank.length; i++) {

        for (let j = 0; j < bank[i].credit.length; j++) {
            sumBankUsd += callback(bank[i].credit[j].ownMoney, bank[i].credit[j].currency, rate);
            sumBankUsd += callback(bank[i].credit[j].creditMoney, bank[i].credit[j].currency, rate);
        }

        for (let k = 0; k < bank[i].debit.length; k++) {
            sumBankUsd += callback(bank[i].debit[k].ownMoney, bank[i].debit[k].currency, rate);
        }
    }

    return sumBankUsd;
}

function calculatDebtActiveUsd(rate:currencyRate[], callback:callback) {
    let debtActiveUsd = 0;

    for (let i = 0; i < bank.length; i++) {

        if (bank[i].isActive) {
            for (let j = 0; j < bank[i].credit.length; j++) {
                if (bank[i].credit[j].ownMoney < 0) {
                    debtActiveUsd += callback(Math.abs(bank[i].credit[j].ownMoney), bank[i].credit[j].currency, rate);
                }
            }
        }
    }

    return debtActiveUsd;
}

function calculatDebtNotActiveUsd(rate:currencyRate[], callback:callback) {
    let debtNotActiveUsd = 0;

    for (let i = 0; i < bank.length; i++) {

        if (!bank[i].isActive) {
            for (let j = 0; j < bank[i].credit.length; j++) {

                if (bank[i].credit[j].ownMoney < 0) {
                    debtNotActiveUsd += callback(Math.abs(bank[i].credit[j].ownMoney), bank[i].credit[j].currency, rate);
                }
            }
        }
    }
    return debtNotActiveUsd;
}


async function currency(callback:callback) {
    let currenRequest = (await fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')).json();
    currenRequest.then(requestResult => calculatSumBankUsd(requestResult, callback))
    currenRequest.then((requestResult) => calculatDebtActiveUsd(requestResult, callback))
    currenRequest.then((requestResult) => calculatDebtNotActiveUsd(requestResult, callback))
}

currency(rate);
