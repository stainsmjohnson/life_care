import create, { GetState, SetState } from 'zustand';
import auth from './auth';

export const useStore = create((set: SetState<any>, get: GetState<any>) => ({
  ...auth(set, get),
}));

export * from './transaction';

export default useStore;
