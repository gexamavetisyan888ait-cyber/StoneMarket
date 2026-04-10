import { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "./firebase";

/**
 * useRealtimeCollection hook-ը այժմ Generic է:
 * <T> նշանակում է, որ այն կարող է ընդունել ցանկացած տիպ (օրինակ՝ Product):
 */
export const useRealtimeCollection = <T>(path: string) => {
  // Տվյալները սահմանում ենք որպես T տիպի զանգված
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(ref(db, path));

        if (snapshot.exists()) {
          const val = snapshot.val();

          // Ձևափոխում ենք տվյալները և նշում, որ արդյունքը համապատասխանում է T տիպին
          const result = Object.keys(val).map((key) => ({
            id: key,
            ...val[key],
          })) as T[];

          setData(result);
        } else {
          setData([]);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [path]);
    
  return { data, loading, error };
};