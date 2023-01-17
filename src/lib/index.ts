import { Pokemon, NamedAPIResourceList } from "pokenode-ts";
import { useEffect, useState } from "react";

export function useApi(url: string, method: string = "get") {
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<any>();
  const [error, setError] = useState<any>();

  useEffect(() => {
    fetch(url, { method: method })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setResponse(data);
      })
      .catch((error) => {
        setError(error.toString()); //just in case error isn't a string
      });
  }, [url]);

  return { loading, response, error };
}

export function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
