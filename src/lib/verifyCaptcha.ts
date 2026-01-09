export async function verifyCaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    throw new Error("Missing RECAPTCHA_SECRET_KEY");
  }

  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret,
        response: token,
      }),
    }
  );

  const data = await response.json();

  /**
   * data = {
   *   success: boolean,
   *   score: number,
   *   action: string,
   * }
   */

  return data.success && data.score >= 0.5;
}
