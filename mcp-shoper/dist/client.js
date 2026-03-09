import { getToken, getSiteUrl } from "./auth.js";
export async function shoperFetch(path, options = {}) {
    const token = await getToken();
    const url = `${getSiteUrl()}/webapi/rest${path}`;
    const res = await fetch(url, {
        ...options,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            ...options.headers,
        },
    });
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Shoper API error ${res.status} ${res.statusText}: ${body}`);
    }
    if (res.status === 204)
        return null;
    return res.json();
}
