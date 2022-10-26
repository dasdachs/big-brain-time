export type FireStoreQueryOperators = "==" | "<" | ">" | ">=" | "<=" | "!=" | "array-contains" | "array-contains-any" | "in" | "not-in"

export interface QueryParams<T> {
    order?: string
    page: number
    limit: number
    compoundQueryParams?: [keyof T, FireStoreQueryOperators, string | boolean | number | string[] ][]
}