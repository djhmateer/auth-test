export default async (req: Request) => {
  const auth = req.headers.get("authorization") || "";
  const expectedUser = Deno.env.get("BASIC_USER") || "user";
  const expectedPass = Deno.env.get("BASIC_PASS") || "pass";

  // Expect "Basic base64(user:pass)"
  const ok = (() => {
    if (!auth.startsWith("Basic ")) return false;
    const decoded = atob(auth.replace(/^Basic\s+/i, ""));
    const [u, p] = decoded.split(":");
    return u === expectedUser && p === expectedPass;
  })();

  if (!ok) {
    return new Response("Authentication required.", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Restricted"' }
    });
  }

  // let the request pass through
  return fetch(req);
};
