import create, { SetState, GetState } from 'zustand';

interface Transaction {
  id: number;
  title: string;
  amount: number;
}
interface Transactions {
  data: Transaction[];
  isFetching: boolean;
  error: string | null;

  get: () => void;
  create: () => void;
  delete: () => void;
}

export const useTransaction = create(
  (set: SetState<any>, get: GetState<any>) => ({
    data: [],
    isFetching: false,
    error: null,

    get: async () => {
      try {
        set({ isFetching: true });
        const data = Array.from({ length: 5 }, (_, k) => k).map(id => ({
          id,
          title: 'Test ' + id,
          amount: Math.floor(Math.random() * 1000),
        }));
        set({ data, isFetching: false });
      } catch (err: any) {
        set({ isFetching: false, error: err.message });
      }
    },

    create: async () => {
      try {
        const data = get().data;
        set({ isFetching: true });

        const id = Date.now();
        set({
          data: [
            ...data,
            {
              id,
              title: 'Test ' + id,
              amount: Math.floor(Math.random() * 1000),
            },
          ],
          isFetching: false,
        });
      } catch (err: any) {
        set({ isFetching: false, error: err.message });
      }
    },

    delete: async (id: number) => {
      try {
        const preData = get().data;
        set({ isFetching: true });
        const data = preData.filter(i => i.id !== id);
        set({ data, isFetching: false });
      } catch (err: any) {
        set({ isFetching: false, error: err.message });
      }
    },
  }),
);
