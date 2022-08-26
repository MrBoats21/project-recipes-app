import { useEffect, useRef } from 'react';

function useUpdate(callback, dependecies = []) {
  const initialMount = useRef(true);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      return callback();
    }
  }, [dependecies, callback]);
}

export default useUpdate;
