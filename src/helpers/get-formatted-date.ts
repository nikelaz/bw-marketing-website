const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

const getFormattedDate = (date: Date) => `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

export default getFormattedDate;
