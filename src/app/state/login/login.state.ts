import { User } from '../../models/user';

export interface LoginState {
    logging: boolean;
    redirectUrl: string;
    loggedIn: boolean;
    user: User;
}
