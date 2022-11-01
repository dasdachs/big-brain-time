import {useList} from "../hooks";

export function GamesList() {
    const {loading, items, error} = useList<{id: string, data: Record<string, string>}>("games")

    if (loading) {
        return <div>Loading ...</div>
    }

    if (error) {
        return <div>{error.message}</div>
    }
    return(
        <ul>
            {items.map(i => <li>{i.id}</li>)}
        </ul>
    )
}