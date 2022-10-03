/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef } from 'react';

function useDidUpdate(func, dependencies) {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, [func, ...dependencies]);
}

export default useDidUpdate;
