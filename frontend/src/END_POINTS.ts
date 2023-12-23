export const login = `${process.env.NEXT_PUBLIC_HOST}login`; // post / get

export const signup = `${process.env.NEXT_PUBLIC_HOST}signup`; // post

export const checkUser = `${process.env.NEXT_PUBLIC_HOST}checkuser`; // post

export const setSubscription = `${process.env.NEXT_PUBLIC_HOST}set-subscription`; // post

export const userProfile = `${process.env.NEXT_PUBLIC_HOST}profiles/`; //post (need user id at the end)

export const createProfile = `${process.env.NEXT_PUBLIC_HOST}create-profile`; // post

export const deleteProfile = `${process.env.NEXT_PUBLIC_HOST}delete-profile/`; // delete (need user id at the end)

export const updateProfile = `${process.env.NEXT_PUBLIC_HOST}update-profile/`; // put (need user id at the end)
