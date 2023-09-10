const port = 8000;

export const login = `http://localhost:${port}/login`;  // post / get

export const signup = `http://localhost:${port}/signup`;  // post

export const checkUser = `http://localhost:${port}/checkuser`;  // post

export const setSubscription = `http://localhost:${port}/set-subscription`; // post

export const userProfile = `http://localhost:${port}/profiles/`;  //post (need user id at the end)

export const createProfile = `http://localhost:${port}/create-profile`; // post

export const deleteProfile = `http://localhost:${port}/delete-profile/`;  // delete (need user id at the end)

export const updateProfile = `http://localhost:${port}/update-profile/`;  // put (need user id at the end)
