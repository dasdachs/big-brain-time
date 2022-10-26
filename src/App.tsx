import {useInitFirebaseApp} from "./hooks";
import {GamesList} from "./pages";

export default function App() {
    const {initializing, error} = useInitFirebaseApp()

    if (error) {
        return <h3>{error.message}</h3>
    }

    if (initializing) {
        return <p>"Loading ..."</p>
    }
    return(
        <div>
            <GamesList />
        </div>
    )
}
