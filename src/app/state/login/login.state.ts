import { User } from '../../models/user';

export interface LoginState {
    logging: boolean;
    loggedIn: boolean;
    user: User;
}

const initialLoginState: LoginState = {
    logging: false,
    loggedIn: false,
    user: null
};
