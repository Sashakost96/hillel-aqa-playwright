export interface UserData {
    name: string;
    lname: string;
    email: string;
    password: string;
};

export const registeredUserData: UserData = {
    name: "Test",
    lname: "Auto",
    email: `${process.env.TEST_USER_REGISTERED_EMAIL}`,
    password: `${process.env.TEST_USER_REGISTERED_PASSWORD}`,
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

