// src/functions/get-user.js
const mongoose = require('mongoose');
const User = require("./schemas/userSchema")
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
const { cookies } = JSON.parse(event.body);
// const cookies = event.cookies;


if (!cookies){ 
return {
    statusCode: 401,
    body: JSON.stringify({ message: 'No cookies match'}),
}}


const foundUser = await User.findOne({ refreshToken: cookies });

// Detected refresh token reuse!

if (!foundUser) {
    return {
        statusCode: 403,
        body: JSON.stringify({ message: 'No user match'}),
    }
}

if (foundUser.refreshToken[0] !== cookies) {
    return {
        statusCode: 403,
        body: JSON.stringify({ message: 'Not authorized cookies'}),
    }
}
return {
    statusCode: 200,
    body: JSON.stringify({
    message: 'Logged in successfully!',
    user: {token: cookies, user: foundUser.username, role: foundUser.role }
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
