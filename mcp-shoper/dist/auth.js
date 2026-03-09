const REFRESH_BUFFER_MS = 60_000;
let accessToken = null;
let expiresAt = 0;
function getSiteUrl() {
    const url = process.env.SHOPER_SITE_URL;
    if (!url)
        throw new Error("SHOPER_SITE_URL is not set");
    return url.replace(/\/+$/, "");
}
async function fetchToken() {
    const login = process.env.SHOPER_LOGIN;
    const password = process.env.SHOPER_PASSWORD;
    if (!login || !password)
        throw new Error("SHOPER_LOGIN and SHOPER_PASSWORD must be set");
    const res = await fetch(`${getSiteUrl()}/webapi/rest/auth`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(`${login}:${password}`).toString("base64")}`,
        },
    });
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Auth failed (${res.status}): ${body}`);
    }
    return res.json();
}
export async function getToken() {
    if (accessToken && Date.now() < expiresAt - REFRESH_BUFFER_MS) {
        return accessToken;
    }
    const data = await fetchToken();
    accessToken = data.access_token;
    expiresAt = Date.now() + data.expires_in * 1000;
    return accessToken;
}
export { getSiteUrl };
