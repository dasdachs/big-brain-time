import {useEffect, useState} from "react";
import {FireStoreService} from "../services";
import {QueryParams} from "../types";

export function useList<T>(collectionName: string, queryParams?: QueryParams<T>) {
    const [service] = useState(() => new FireStoreService())

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const [items, setItems] = useState<T[]>([])

    useEffect(() => {
        service
            .list<T>(collectionName, queryParams)
            .then(data => setItems(data))
            .catch(e => setError(e as Error))
            .finally(() => setLoading(false))
    })

    return{
        loading,
        error,
        items
    }
}