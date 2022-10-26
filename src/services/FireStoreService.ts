import { collection, deleteDoc, setDoc, doc, endAt, getDoc, getDocs, getFirestore, orderBy, query, QueryConstraint, startAt, where } from "firebase/firestore";
import { QueryParams } from "../types";

export class FireStoreService {
    #db = getFirestore()

    async get<T>(collectionName: string, documentId: string): Promise<T> {
        const docRef = doc(this.#db, collectionName, documentId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            throw Error(`Document with id ${documentId} not found`)
        }
        return docSnap.data() as T
    }

    async list<T>(collectionName: string, queryParams: QueryParams<T> = { page: 1, limit: 20 }): Promise<T[]> {
        const collectionRef = collection(this.#db, collectionName);

        const q = query(collectionRef, ...this.#composeQueryConstraints<T>(queryParams))
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => doc.data()) as T[]
    }

    async save<T extends Record<string, unknown>>(collectionName: string, payload: T, id?: string): Promise<void> {
        const document = id ? doc(this.#db, collectionName, id) : doc(this.#db, collectionName)
        await setDoc(document, payload);
    }

    async delete(collectionName: string, id: string): Promise<void> {
        await deleteDoc(doc(this.#db, collectionName, id));
    }

    #composeQueryConstraints<T>(queryParams: QueryParams<T>): QueryConstraint[] {
        const constraints: QueryConstraint[] = []

        const { order, limit, page, compoundQueryParams } = queryParams
        const start = limit * page

        // Pagination
        constraints.push(startAt(start))
        constraints.push(endAt(start + limit))

        if (order) {
            constraints.push(orderBy(order))
        }

        if (compoundQueryParams) {
            for (const [field, operator, value] of compoundQueryParams) {
                constraints.push(where(field as string, operator, value))
            }
        }

        return constraints
    }
}