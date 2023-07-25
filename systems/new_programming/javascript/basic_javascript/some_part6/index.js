const capitalizeString = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export { capitalizeString };

export const foo = "bar";
export const bar = "foo";

// udah we disini dulu aja lah
// soalnya gak work as expected, harus di node.js
