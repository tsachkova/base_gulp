
let phoneRegular = /^\+\d{2}\(\d{3}\)\d{3}\-\d\d\-\d\d$/;

let emailRegular = /^[a-z][a-z0-9'_+-\.]{1,32}@[a-z0-9.]{1,29}\.[a-z]{2,3}$/;

let websiteRegular = /^http:\/\/([a-z0-9](([a-zA-Z-_0-9](?!\.))|[a-z0-9]){1,29}\.)+[a-z]{2,4}$/;

let passwordRegular = /^[a-zA-z0-9_]{6,25}$/;

let ipRegular = /((^|\.)1(?=\d\d\.?)\d\d|(^|\.)2(?=\d\d\.)[0-4]\d|(^|\.)2(?=\d\d)5[0-5]|(^|\.)\d?\d){4}$/;