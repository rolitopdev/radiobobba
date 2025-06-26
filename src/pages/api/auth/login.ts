export async function GET({ redirect }) {
    const CLIENT_ID = import.meta.env.DISCORD_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.DISCORD_REDIRECT_URI;

    const discordAuthUrl = `https://discord.com/oauth2/authorize` +
        `?client_id=${CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
        `&response_type=code` +
        `&scope=identify%20email`;

    return redirect(discordAuthUrl);
}
