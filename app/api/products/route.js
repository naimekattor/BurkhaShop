import { NextResponse } from "next/server";
import clientPromise from "./../lib/mongo";

// Handle CORS preflight
export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

// Handle POST requests
export async function POST(req) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("products");
    const collection = db.collection("products");

    const result = await collection.insertOne(body);

    return NextResponse.json(
      {
        message: "✅ Product saved!",
        insertedId: result.insertedId,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("MongoDB insert error:", error);
    return NextResponse.json(
      { error: "Failed to save product" },
      { status: 500 }
    );
  }
}

// Handle GET requests
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("products");
    const collection = db.collection("products");

    const products = await collection.find({}).toArray();

    return NextResponse.json(products, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("MongoDB fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
