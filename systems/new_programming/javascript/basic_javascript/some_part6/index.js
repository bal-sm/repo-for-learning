const capitalizeString = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export { capitalizeString };

export const foo = "bar";
export const bar = "foo";

// udah we disini dulu aja lah
// soalnya gak work as expected, harus di node.js

// Use * to Import Everything from a File

import * as capitalizeStrings from "capitalize_strings";
// "./capitalize_strings" if it's on the same directory
