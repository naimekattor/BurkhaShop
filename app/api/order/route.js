// app/api/order/route.js

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Request Body:", body);

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwnwit7gxQqe8zEnJDyq6sHa1Kk66zEHkM4lI2JENIJqxC8eujaSq4lO1pugJDDd9gNgA/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const result = await response.json();
    console.log("Google Apps Script Response:", result);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);

    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
