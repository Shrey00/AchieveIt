import User from '../DbModel/model.js';
export const getGoals = (req, res) => {
    const goals = req.user.goals;
    res.json(goals);
}
export const userData = (req, res) => {
    const userData = req.user.userData;
    res.json(userData);
}

export const postGoals = async (req, res) => {
    const { id, text, deadline } = req.body;
    let foundUser = await User.findById(req.decodedUserId.id);
    foundUser.userData.goals.push({ id, text, deadline });
    foundUser.save();
}

export const postTodo = async (req, res) => {
    const { text, deadline, check } = req.body;
    try {
        let foundUser = await User.findById(req.decodedUserId.id);
        foundUser.userData.todo.push({ text, deadline, check });
        const savekaro = await foundUser.save();
    } catch (e) {
        res.json(e.message);
    }
}

export const removeTodo = async (req, res) => {
    const { index } = req.body;
    let foundUser = await User.findById(req.decodedUserId.id);
    if (foundUser) {
        foundUser.userData.todo.splice(index, 1);
    }
    await foundUser.save();
}

export const removeDone = async (req, res) => {
    const { index } = req.body;
    let foundUser = await User.findById(req.decodedUserId.id);
    if (foundUser) {
        foundUser.userData.done.splice(index, 1);
    }
    await foundUser.save();
}

export const moveToTodo = async (req, res) => {
    const { index } = req.body;
    let foundUser = await User.findById(req.decodedUserId.id);
    if (foundUser) {
        const doneItem = foundUser.userData.done.splice(index, 1);
        let {text,deadline,check} = doneItem[0];
        check = false;
        foundUser.userData.todo.push({text,deadline,check});
    }
    await foundUser.save();
}

export const doneTodoFromTodo = async (req, res) => {
    const { index } = req.body;
    let foundUser = await User.findById(req.decodedUserId.id);
    if (foundUser) {
        const doneItem = foundUser.userData.todo.splice(index, 1);
        let { text, deadline, check } = doneItem[0];
        check = true;
        foundUser.userData.done.push({ text, deadline, check });
        await foundUser.save();
    }
}

export const doneTodoFromDoing = async (req, res) => {
    const { index } = req.body;
    let foundUser = await User.findById(req.decodedUserId.id);
    if (foundUser) {
        const doneItem = foundUser.userData.doing.splice(index, 1);
        let { text, deadline, check } = doneItem[0];
        check = true;
        foundUser.userData.done.push({ text, deadline, check });
        await foundUser.save();
    }
}

export const transferTodoToDoing = async (req) => {
    const { index } = req.body;
    let foundUser = await User.findById(req.decodedUserId.id);
    if (foundUser) {
        const todoToDoing = foundUser.userData.todo.splice(index, 1);

        const { text, deadline, check } = todoToDoing[0];
        foundUser.userData.doing.push({ text, deadline, check });
        await foundUser.save();
    }
}

export const transferDoneToDoing = async (req) => {
    const { index } = req.body;
    let foundUser = await User.findById(req.decodedUserId.id);
    if (foundUser) {
        const todoToDoing = foundUser.userData.done.splice(index, 1);
        let { text, deadline, check } = todoToDoing[0];
        check = false;
        foundUser.userData.doing.push({ text, deadline, check });
        await foundUser.save();
    }
}


