/**
 * Formats a date string to DD.MM.YYYY format
 * @param {string} dateString - The date string to format
 * @returns {string} Formatted date in DD.MM.YYYY format
 */
export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
};
