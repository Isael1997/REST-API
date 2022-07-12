import Role from '../models/roles'

//creating of roles
export const createRole = async() => {
    try {
        const count = await Role.estimatedDocumentCount();
        if (count >  0) {
            return;
        }else{
            const values = await Promise.all([
                new Role({name: "user"}).save(),
                new Role({name: "moderate"}).save(),
                new Role({name: "admin"}).save()
            ]);
            console.log(values);
        }
    } catch (error) {
        console.log(error);
    }
}
