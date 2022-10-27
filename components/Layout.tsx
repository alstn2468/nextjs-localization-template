import { useCallback, type PropsWithChildren } from 'react';
import { L10nContextProvider, type L10nContextType } from '~/context/L10nContext';

type Props = PropsWithChildren & Omit<L10nContextType, 't'>

function Layout(props: Props) {
  const { children, locale, translations } = props;
  const t = useCallback((key: string) => {
    return translations[key] ?? `⚠️ ${key}`;
  }, [translations]);
  return (
    <L10nContextProvider value={{ locale, t, translations }}>
      {children}
    </L10nContextProvider>
  );
}

export default Layout;
