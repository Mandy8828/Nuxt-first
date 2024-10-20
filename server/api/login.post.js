import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!(body.account === "Mandy" && body.password === "0128")) {
    throw createError({
      statusCode: 400,
      statusMessage: "登入失敗",
    });
  }

  const jwtTokenPayload = {
    id: 1,
    nickname: "Mandy",
    email: "mandy880128mandy@gmail.com",
    // avatar:
    //   "https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?fit=crop&w=128&h=128",
    avatar:
      "https://scontent.frmq1-1.fna.fbcdn.net/v/t39.30808-6/338497494_227801709929826_5170673070106854080_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=cJzwqgeM7TcQ7kNvgHCt3-5&_nc_zt=23&_nc_ht=scontent.frmq1-1.fna&_nc_gid=AyrVzKqToo5h_lOZStsKMtk&oh=00_AYDIrGPmT0F2pZcMZCmBh_u5JasEHz8uVIejVS4YCNFeCg&oe=671AB05E",
  };

  const maxAge = 60 * 60 * 24 * 7;
  const expires = Math.floor(Date.now() / 1000) + maxAge;

  const jwtToken = jwt.sign(
    {
      exp: expires,
      data: jwtTokenPayload,
    },
    "JWT_SIGN_SECRET_PLEASE_REPLACE_WITH_YOUR_KEY"
  );

  setCookie(event, "access_token", jwtToken, {
    maxAge,
    expires: new Date(expires * 1000),
    secure: true,
    httpOnly: true,
    path: "/",
  });

  return "登入成功";
});
