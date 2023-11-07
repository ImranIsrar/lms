

import { useLayoutEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

const useSavedUser = (key) => {

  // secureLocalStorage.clear();
  const data = secureLocalStorage.getItem(key);
  const parsedData = (data && data !== 'undefined' && data != undefined) ? JSON.parse(data) : null;
  const [storedData, setStoredData] =  useState(parsedData);
  useLayoutEffect(() => {
    
    setStoredData(parsedData);
    console.log('data', parsedData);
  }, [data]);

  return storedData;
}

export default useSavedUser;
