import {useEffect, useState} from "react";
import {FireStoreService} from "../services";

export function useDetails<T>(collectionName: string, documentId: string) {
    const [service] = useState(() => new FireStoreService())

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const [item, setItem] = useState<T | null>(null)

    useEffect(() => {
        service
            .get<T>(collectionName, documentId)
            .then(data => setItem(data))
            .catch(e => setError(e as Error))
            .finally(() => setLoading(false))
    })

    return{
        loading,
        error,
        item
    }
}