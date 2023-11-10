const mongoose = require('mongoose');
const User = require("./schemas/userSchema")
const jwt = require('jsonwebtoken');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

const handler = async (event, context) => {

try { 
    await mongoose.connect(uri, {
    dbName: 'login',
    useNewUrlParser: true,
    useUnifiedTopology: true,
//     server: {
//         socketOptions: {
//           socketTimeoutMS: 0,
//           connectTimeoutMS: 0
// }}
})


context.callbackWaitsForEmptyEventLoop = false;
const { username, password } = JSON.parse(event.body);

// // Extract the username from the query string
// const username = event.queryStringParameters.username;
// Find the user by username (modify the query as needed)
const user = await User.findOne({ username });

if (!user) {
    return {
    statusCode: 401,
    body: JSON.stringify({ message: "User doesn't exist" })
};
}

// const validPassword = await bcrypt.compare(password, user.password);

if (password !== user.password) {
    return {
        statusCode: 401,
        body: JSON.stringify({ message: 'Wrong username/password combination!' })
};
}        

const role = user.role;
const token = jwt.sign(
    {
        "UserInfo": {
            "username": user.username,
            "role": role
        }
    },
    process.env.JWT_SECRET,
    // { expiresIn: '10s' }
);
        user.refreshToken = token;
        const result = await user.save();

        // Creates Secure Cookie with refresh token

return {
    statusCode: 200,
    body: JSON.stringify({
    message: 'Logged in successfully!',
    user: {token: token, id: user._id, user: user.username, role: user.role }
    }),
};

} catch (error) {
return {
    statusCode: 500,
    body: JSON.stringify({ message: 'Internal server error', error: error }),
    };
    }finally {
        // Close the database connection after the request is done
        setTimeout(() => {mongoose.connection.close()},1500);
        }
        };

module.exports = { handler };