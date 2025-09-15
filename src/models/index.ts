import sequelize from '../config/database';
import User from './User';

const models = {
    User,
};

export { sequelize };
export default models;