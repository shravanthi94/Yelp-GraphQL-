const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');

const customerLogin = async (args) => {
  let user = await User.findOne({ email: args.email });
  if (!user) {
      return { status: 401, message: "NO_USER" };
  }
  const isMatch = await bcrypt.compare(args.password, user.password);

  if (isMatch) {
      const payload = { 
        user: {
          id: user._id, 
          name: user.name, 
          email: user.email, 
          usertype: 'customer' 
        }
      };

      const token = jwt.sign(
        payload, 
        config.get('jwtSecret'), 
        { expiresIn: 1008000 }
      );

      return { 
        status: 200,
        message: token
      };
  }
  else {
      return { status: 401, message: "INCORRECT_CREDENTIALS" };
  }
}

exports.customerLogin = customerLogin;