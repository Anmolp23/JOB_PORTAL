export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  
  const options = {
    expiresIn:'1d', // Set expiresIn directly in options object
    httpOnly: true, // Set httpOnly to true
    secure:true,
    sameSite:"None",
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });

};