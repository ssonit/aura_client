import { NextRequest, NextResponse } from "next/server";

const model = "black-forest-labs/FLUX.1-dev";

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  if (!prompt) {
    return NextResponse.json(
      {
        error: "Prompt is required",
      },
      {
        status: 400,
      }
    );
  }

  const token = process.env.HUGGING_FACE_TOKEN;

  if (!token) {
    return NextResponse.json(
      {
        error: "Token is required",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    console.log(response);

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const data = await response.arrayBuffer();

    return new Response(data, {
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error generating image" },
      { status: 500 }
    );
  }
}
