export const prerender = false;

export async function POST({ request, cookies }) {
    const { code } = await request.json();

    if (!code) {
        return new Response(JSON.stringify({ error: "No se recibió el código" }), {
            status: 400,
        });
    }

    const CLIENT_ID = import.meta.env.DISCORD_CLIENT_ID;
    const CLIENT_SECRET = import.meta.env.DISCORD_CLIENT_SECRET;
    const REDIRECT_URI = import.meta.env.DISCORD_REDIRECT_URI;

    const params = new URLSearchParams();
    params.append("client_id", CLIENT_ID);
    params.append("client_secret", CLIENT_SECRET);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", REDIRECT_URI);

    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params,
    });

    const tokenData = await tokenRes.json();

    if (tokenData.error) {
        return new Response(JSON.stringify({ error: tokenData.error_description }), {
            status: 400,
        });
    }

    const userRes = await fetch("https://discord.com/api/users/@me", {
        headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
        },
    });

    const user = await userRes.json();

    // 💾 Guardamos un JSON serializado en una sola cookie
    const session = {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
    };

    cookies.set("session", JSON.stringify(session), {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: false, // cambia a true si usas HTTPS
        maxAge: 60 * 60 * 24 * 7,
    });

    return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
    });
}