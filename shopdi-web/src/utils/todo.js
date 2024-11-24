/**
 * [{"type":"Chieu dai","value":"15"},{"type":"Mau muc","value":"den"}]
 * --> Chieu dai:15, Mau muc:den
 */
export const JSONToData = (json) => {
    const data = JSON.parse(json);
    let ans = "";
    for (let i = 0; i < data.length; i++) {
        ans = ans + data[i].type + ":" + data[i].value + ", ";
    }
    return ans.substring(0, ans.length - 2);
}