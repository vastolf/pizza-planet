/**
 * 
 * @param name A string, which should be between 3-16 characters and contain only letters
 * @returns true if the string is between 3-16 characters and only contains letters, otherwise it returns false
 */
// We're going to use the same string validation for Pizza Toppings and People Names
export const dbEntryStringIsValid = (str: string) : boolean => {
    // tests that name exists, and has a length between 3 - 16 characters
    if (!str || str.length < 3 || str.length > 16) return false
    // tests that the name only contains letters A-Z and a-z
    return /^[a-zA-Z]+$/.test(str);
}

export const yearIsValid = (year: number) : boolean => {
    // Ensures that there is in fact a year and that the year is 4 digits long
    if (!year || year.toString().length !== 4) return false
    // Ensures that the year value is not greater than the current UTC year 
    const currentDate = new Date()
    return (year <= currentDate.getUTCFullYear())
}

export const monthIsValid = (month: number) : boolean => {
    if (!month || month.toString().length > 2 || month > 12) return false
    return true
}