/**
 * 
 * @param zuluTimestamp A UTC (Zulu) timestamp string to be convertied to a unix epoch timestamp
 * @returns The number of MS between unix epoch & the zuluTimestamp provided
 */
export const convertZuluToEpoch = (zuluTimestamp: string) : number => {
    const date = new Date(zuluTimestamp).toUTCString();
    return new Date(date).valueOf()
}