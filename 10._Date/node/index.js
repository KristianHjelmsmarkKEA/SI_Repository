console.log(new Date())

console.log(Date())

console.log(Date.now()) //seconds from time started

//ISO 8601 standard
const date = new Date();

const danishDate = Intl.DateTimeFormat("da-dk").format(date);
console.log(danishDate);

const americanDate = Intl.DateTimeFormat("en-us").format(date);
console.log(americanDate);