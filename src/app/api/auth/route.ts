export async function POST(request: Request) {
  const res = await request.json();
  const token = res.token;

  if (!token) {
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
      "Set-Cookie": `token=${token}; Path=/; HttpOnly; SameSite=Lax; Secure`,
    },
  });
}
