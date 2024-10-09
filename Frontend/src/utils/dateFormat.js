export const dateFormat = (date) => {
    // Check if the date is a valid string and contains one of the common separators
    if (typeof date !== 'string' || !/[\-\/\.]/.test(date)) {
        throw new Error('Invalid date format');
    }

    // Determine the separator used in the date string
    const separator = date.includes('/') ? '/' : (date.includes('-') ? '-' : '.');

    // Split the date string by the separator, reverse the parts, and join them back
    return date.split(separator).reverse().join('/');
};
