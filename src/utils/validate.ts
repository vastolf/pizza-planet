/**
 * 
 * @param name A string, which should be between 3-16 characters and contain only letters
 * @returns true if the string is between 3-16 characters and only contains letters, otherwise it returns false
 */
// We're going to use the same string validation for Pizza Toppings and People Names
export const dbEntryStringIsValid = (str: string) => {
    // tests that name exists, and has a length between 3 - 16 characters
    if (!str || str.length < 3 || str.length > 16) return false
    // tests that the name only contains letters A-Z and a-z
    return /^[a-zA-Z]+$/.test(str);
}