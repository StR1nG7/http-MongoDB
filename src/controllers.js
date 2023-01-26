const User = require('./models');

const getUsers = () => User.find();

const saveUser = user => {
    const newUser = new User(user);
    return newUser.save();
}

const deleteUser = id => User.findByIdAndDelete(id);

const updateUser = (id, userData) => User.findByIdAndUpdate(id, userData, { new: true });

const UserControllers = {
    getUsers, saveUser, deleteUser, updateUser
}

module.exports = UserControllers;