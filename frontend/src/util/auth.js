export const getTokenParams = (params) => {
  if (window.location.search) {
    let tokenData = {
      accessToken: params.get("accessToken"),
      refreshToken: params.get("refreshToken"),
      expiresAt: Date.now() + parseInt(params.get("expiresIn")) * 1000,
      token: params.get("token"),
    };
    return tokenData;
  }
  return null;
};
