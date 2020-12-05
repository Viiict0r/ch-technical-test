import { useEffect, useCallback, useState } from 'react';

const useInfiniteScroll = callback => {
  const [isFetching, setFetching] = useState(false);

  const getDocumentHeight = useCallback(() => {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
  }, []);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.pageYOffset + 20 >= getDocumentHeight() &&
      !isFetching
    ) {
      setFetching(true);
    }
  }, []);

  useEffect(() => {
    if (!isFetching) return;

    callback();
  }, [isFetching]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return [isFetching, setFetching];
};

export default useInfiniteScroll;
