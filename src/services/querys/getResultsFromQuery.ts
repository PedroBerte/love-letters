import { DocumentData, getDocs, Query } from "firebase/firestore";

export default async function getResultFromQuery<T>(
  query: Query<DocumentData, DocumentData>
) {
  try {
    const queryResult = await getDocs(query);
    return queryResult.docs.map((x) => x.data() as T) as T[];
  } catch (error) {
    console.log(error);
  }
}
