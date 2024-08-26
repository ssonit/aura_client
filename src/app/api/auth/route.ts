export async function POST(request: Request) {
  const res = await request.json();
  const sessionToken = res.token;

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

  return Response.json(res, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken=${sessionToken}; Path=/;`,
    },
  });
}
