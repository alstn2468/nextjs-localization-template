import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
import { useRouter } from 'next/router';

type Params = string | (() => string);

function useRedirect(to: Params) {
  const router = useRouter();
  useIsomorphicLayoutEffect(() => {
    router.replace(typeof to === 'string' ? to : to());
  }, []);
}

export default useRedirect;
