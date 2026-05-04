import { useDispatch, useSelector } from 'react-redux';

// Typed hooks depend on AppDispatch/RootState from app/store.
// This is a known pragmatic FSD exception: shared cannot import app,
// but typed Redux hooks require the configured store types.
// eslint-disable-next-line boundaries/element-types
import { type AppDispatch, type RootState } from 'app/store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
