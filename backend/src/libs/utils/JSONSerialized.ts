export function SerializedJSON (list: object[]){
    JSON.stringify(
        list, 
        (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    );
}