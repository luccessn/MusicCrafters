/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";

const useFetchData = (url) => {
  const [data, setdata] = useState([]);
  const [error, seterror] = useState("");
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    setisLoading(true);
    fetch(url)
      .then((resp) => {
        if (resp) {
          return resp.json();
        }
        throw new Error("Fetch Error");
      })
      .then((dt) => setdata(dt))
      .catch((err) => seterror(err))
      .finally(() => setisLoading(false));
  }, [url]);

  return [data, error, isLoading];
};

export default useFetchData;
