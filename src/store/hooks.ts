import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { setLanguage, selectLanguage, selectTranslation } from './languageSlice';
import type { Language } from './languageSlice';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <TSelected>(selector: (state: RootState) => TSelected) => useSelector(selector);

// Custom hook to replace useLanguage from context
export const useLanguage = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector(selectLanguage);

  const setLanguageAction = (newLanguage: Language) => {
    dispatch(setLanguage(newLanguage));
  };

  const t = (key: string): string => {
    return useAppSelector(selectTranslation(key));
  };

  return {
    language,
    setLanguage: setLanguageAction,
    t,
  };
};
