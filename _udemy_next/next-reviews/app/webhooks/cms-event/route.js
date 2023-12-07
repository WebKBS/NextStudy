export async function POST(request) {
  const payload = await request.json();
  console.log('PayLoad: ', payload);
  return new Response(null, { status: 204 });
}
