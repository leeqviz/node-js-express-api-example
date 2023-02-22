import { sequelize } from './db-connection.js'
import { Role } from '../models/role.js'
import { User } from '../models/user.js';
import { Post } from '../models/post.js';

export function createDatabase() {
    Role.hasMany(User);
    User.belongsTo(Role);
    User.hasMany(Post);
    Post.belongsTo(User);

    sequelize
        .sync({force: false})
        .then(() => {
            return Role.bulkCreate([
                {name: 'admin'}, 
                {name: 'user'}
            ]);
        })
        .catch(err => console.log(`Error with DB connection: ${err}`));
}