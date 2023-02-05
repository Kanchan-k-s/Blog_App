const jwt = require('jsonwebtoken');

module.exports= function jwtTokens({
    user_id,user_name
}){
    const user={user_id,user_name};
    const accesstoken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'});
    const refreshtoken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'2h'});
    return ({accesstoken,refreshtoken});
};