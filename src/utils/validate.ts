/**
 * 
 * @param name A string, which should be between 3-16 characters and contain only letters
 * @returns true if the string is between 3-16 characters and only contains letters, otherwise it returns false
 */
export const newPersonNameIsValid = (name: string) => {
    // tests that name exists, and has a length between 3 - 16 characters
    if (!name || name.length < 3 || name.length > 16) return false
    // tests that the name only contains letters A-Z and a-z
    return /^[a-zA-Z]+$/.test(name);
}