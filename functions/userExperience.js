const mongoose = require('mongoose');
const User = require("./schemas/userSchema")

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
    const { username, usage } = JSON.parse(event.body);
    const userUsing = await User.findOne({ username });
    
    if (!userUsing) {         
        return {
        statusCode: 401,
        body: JSON.stringify({ message: 'No user found' })
        }; 
    }

     if (typeof userUsing.usage === 'object' && Object.keys(userUsing.usage).length === 0) {
        userUsing.usage = usage;
        const result = await userUsing.save();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User usage posted successfully!' })
        };
    } else {
        let info = userUsing.usage;
        let prompt = info.prompt_tokens + usage.prompt_tokens;
        let completion = info.completion_tokens + usage.completion_tokens;
        let total = info.total_tokens + usage.total_tokens;
        let usageUpdate = {prompt_tokens: prompt, completion_tokens: completion, total_tokens: total};
        userUsing.usage = usageUpdate;
        const result = await userUsing.save();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User usage posted successfully!' })
    };
    }
    } catch (error) {
    return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal server error', error: error }),
        };
    }
    finally {
        // Close the database connection after the request is done
        setTimeout(() => {mongoose.connection.close()},1500);
        }
    };
    
    module.exports = { handler };
