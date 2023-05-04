import { use } from 'react';
import { z } from 'zod';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// const UserState = z.object({
//   id: z.string(),
//   email: z.string().email(),
//   login: z
//     .function()
//     .args(z.object({ id: z.string(), email: z.string().email() }))
//     .returns(z.void()),
//   logout: z.function().returns(z.void()),
// });

// const ProfileState = z.object({
//   ico: z.number(),
//   dic: z.number(),
//   firstname: z.number(),
//   lastname: z.number(),
//   street: z.number(),
//   houseno: z.number(),
//   postalcode: z.number(),
//   city: z.string(),
//   invStreet: z.number(),
//   invHouseno: z.number(),
//   invPostalcode: z.number(),
//   invCity: z.string(),
// });

// export type UserStateType = z.infer<typeof UserState>;
// export type ProfileStateType = z.infer<typeof ProfileState>;

// export const useUserStore = create<UserStateType>()((set) => ({
//   id: '',
//   email: '',
//   login: ({ id, email }) => set(() => ({ id: id, email: email })),
//   logout: () => set({}, true),
// }));

// export const useId = () =>
//   useUserStore((state) => {
//     return state.id;
//   });
// export const useEmail = () =>
//   useUserStore((state) => {
//     return state.email;
//   });
// export const useLogin = (id: string, email: string) => {
//   useUserStore((state) => {
//     state.login({ id, email });
//   });
// };
// export const useLogout = () => {
//   useUserStore((state) => {
//     state.logout();
//   });
// };

// const UserState = z.object({
//   id: z.string(),
//   email: z.string().email(),
//   login: z
//     .function()
//     .args(z.object({ id: z.string(), email: z.string().email() }))
//     .returns(z.void()),
//   logout: z.function().returns(z.void()),
// });

const UserState = z.object({
  firstName: z.string(),
  lastName: z.string().email(),
});

const UserAction = z.object({
  updateNames: z.function().args(z.string(), z.string()).returns(z.void()),
});
export type UserStateType = z.infer<typeof UserState>;
export type UserActionType = z.infer<typeof UserAction>;

// Create your store, which includes both state and (optionally) actions
const useUserStore = create<UserStateType & UserActionType>((set) => ({
  firstName: '',
  lastName: '',
  updateNames: (firstName, lastname) =>
    set(() => ({ firstName: firstName, lastName: lastname })),
}));

export default useUserStore;
