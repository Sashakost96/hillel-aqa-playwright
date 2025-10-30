 export interface UserData {
    name: string;
    lname: string;
    email: string;
    password: string;
};

export const registeredUserData: UserData = {
    name: "Test",
    lname: "Auto",
    email: "ke@gmail.com",
    password: "test123KO!",
};

export const validUserData: UserData = {
    name: "Test",
    lname: "Auto",
    email: `aqa_cat+${Date.now().toString().slice(-4)}@example.com`,
    password: "test123KO!",
};

export const inValidUserData: UserData = {
    name: "_Test",
    lname: "_Auto",
    email: "ke@gmail.",
    password: " test123KO!",
};

