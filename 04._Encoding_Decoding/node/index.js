const base64EncodedString = btoa("helo there, this is base 64");
console.log(base64EncodedString);

const base64DecodedString = atob(base64EncodedString);
console.log(base64DecodedString);