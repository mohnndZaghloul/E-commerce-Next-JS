import { auth } from "@/lib/auth/auth";

export async function POST(req: Request) {
  const { token, newPassword } = await req.json();

  await auth.api.resetPassword({
    body: {
      token,
      newPassword,
    },
  });

  return new Response("Password updated");
}
