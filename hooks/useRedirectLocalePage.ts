import { type Option, some, isNone } from 'fp-ts/lib/Option';
import { isEmpty, findFirst } from 'fp-ts/lib/Array';
import { constTrue } from 'fp-ts/lib/function';

import useRedirect from './useRedirect';

function getTargetLocale(
  locales: string[],
  currentLocale: string
): Option<string> {
  if (isEmpty(locales)) {
    throw new Error('Error: locales is empty.');
  }
  if (locales.includes(currentLocale)) {
    return some(currentLocale);
  }
  return findFirst(constTrue)(locales);
}

function useRedirectLocalePage(locales: string[]) {
  useRedirect(() => {
    const [navigatorLocale] = window.navigator.language.split('-');
    const targetLocale = getTargetLocale(locales, navigatorLocale);

    if (isNone(targetLocale)) {
      throw new Error('Error: targetLocale is None.');
    }

    return targetLocale.value;
  });
}

export default useRedirectLocalePage;
