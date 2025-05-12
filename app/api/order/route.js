// app/api/order/route.js

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Request Body:", body);

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzQhGr0zwP-5WeKkZxUkc4gQ6NTJG64pRhdZWEejPFcke3g-mWa9JERwBD_IkSS48QC/exec",
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
