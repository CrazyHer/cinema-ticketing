import { configure } from 'mobx';
import Admin from './admin';
import User from './user';

configure({ enforceActions: 'observed' });

const user = new User();
const admin = new Admin();
const stores = { user, admin };

export default stores;
