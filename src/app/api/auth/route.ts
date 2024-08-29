export async function POST(request: Request) {
  const res = await request.json();
  const { access_token, refresh_token } = res.token;

  if (!access_token || !refresh_token) {
    return Response.json(
      {
        message: "Invalid token",
      },
      {
        status: 400,
      }
    );
  }

  return Response.json(res, {
    status: 200,
    headers: {
      "Set-Cookie": [
        `token=${access_token}; Path=/; HttpOnly; SameSite=Lax; Secure`,
        `refreshToken=${refresh_token}; Path=/; HttpOnly; SameSite=Lax; Secure`,
      ].join(", "),
    },
  });
}
