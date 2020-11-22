const User = require("../models/UserModel");
const bcrypt = require('bcryptjs');

const customerSignup = async (args) => {
    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(args.password, salt);

    let newUser = new User({
        name: args.name,
        email: args.email,
        password: hashedPassword,
    });

    let user = await User.find({ email_id: args.email_id });
    if (user.length) {
        return { status: 400, message: "USER_EXISTS" };
    }
    let savedUser = await newUser.save();
    if (savedUser) {
        return { status: 200, message: "USER_ADDED" };
    }
    else {
        return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    }
};

exports.customerSignup = customerSignup;