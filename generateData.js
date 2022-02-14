/* Generating admin user for demo */
const catchAsync = require('./utils/catchAsync');

const { UserModel } = require('./models');
const addAdmin = catchAsync(async () => {
    const adminUsername = 'attainu';
    const adminPassword = 'attainU@123';
    const isAdminExists = await UserModel.count({ username: adminUsername });
    if (!isAdminExists) {
        const adminUserData = new UserModel({
            username: adminUsername,
            password: adminPassword,
        });
        await adminUserData.save();
        console.log('Admin user added');
    }
});


addAdmin();