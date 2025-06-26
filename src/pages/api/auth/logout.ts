export const prerender = false;

export async function POST({ cookies }) {
    cookies.delete("session", { path: "/" });

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/",
        },
    });
}
