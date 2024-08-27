export async function POST(request: Request) {
  const res = await request.json();
  const sessionToken = res.token;
  // const expiresAt = res.expiresAt as string;

  if (!sessionToken) {
    return Response.json(
      {
        message: "Invalid token",
      },
      {
        status: 400,
      }
    );
  }
  // const expiresDate = new Date(expiresAt).toUTCString();

  return Response.json(res, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Secure`,
    },
  });
}
