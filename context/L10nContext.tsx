import { type PropsWithChildren, createContext, useContext } from 'react';

interface L10nContextType {
  locale: string;
  translations: Record<TransltaionKeys, string>;
  t: (key: TransltaionKeys) => string;
}

const L10nContext = createContext<L10nContextType | null>(null);
L10nContext.displayName = 'L10nContext';

const useL10nContext = () => {
  const l10nContext = useContext(L10nContext);
  if (!l10nContext) {
    throw new Error('Error: l10nContext is null');
  }
  return l10nContext;
};
const useLocale = () => useL10nContext().locale;
const useTranslation = () => useL10nContext().t;

function L10nContextProvider(props: PropsWithChildren<{ value: L10nContextType }>) {
  const { children, value } = props;
  return (
    <L10nContext.Provider value={value}>
      {children}
    </L10nContext.Provider>
  );
}

export {
  type L10nContextType,
  useLocale,
  useTranslation,
  L10nContextProvider,
};
