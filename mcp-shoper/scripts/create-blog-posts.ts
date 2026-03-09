import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(import.meta.dirname, "../../.env.local") });

const SITE_URL = process.env.SHOPER_SITE_URL!.replace(/\/+$/, "");
const LOGIN = process.env.SHOPER_LOGIN!;
const PASSWORD = process.env.SHOPER_PASSWORD!;

let token: string | null = null;
async function auth() {
  if (token) return token;
  const res = await fetch(`${SITE_URL}/webapi/rest/auth`, { method: "POST", headers: { Authorization: `Basic ${Buffer.from(`${LOGIN}:${PASSWORD}`).toString("base64")}` } });
  const data = (await res.json()) as { access_token: string };
  token = data.access_token;
  return token;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function api(p: string, opts: RequestInit = {}) {
  const t = await auth();
  for (let i = 0; i < 5; i++) {
    const res = await fetch(`${SITE_URL}/webapi/rest${p}`, { ...opts, headers: { Authorization: `Bearer ${t}`, "Content-Type": "application/json" } });
    if (res.status === 429) { await sleep(2000 * (i + 1)); continue; }
    if (!res.ok) { const b = await res.text(); throw new Error(`${res.status}: ${b}`); }
    if (res.status === 204) return null;
    return res.json();
  }
}

const posts = [
  {
    name: "Jak dbać o biżuterię ze złota i srebra",
    date: "2026-03-01",
    author: "Zegarmistrzostwo",
    active: 1,
    lang_id: "1",
    seo_title: "Jak dbać o biżuterię ze złota i srebra — poradnik",
    seo_description: "Praktyczne porady dotyczące pielęgnacji biżuterii ze złota i srebra.",
    seo_url: "jak-dbac-o-bizuterie-ze-zlota-i-srebra",
    short_content: "Biżuteria ze złota i srebra wymaga odpowiedniej pielęgnacji, aby zachować swój blask na lata.",
    content: "<h2>Jak dbać o biżuterię ze złota i srebra?</h2><p>Biżuteria to nie tylko ozdoba — to często pamiątka, prezent od bliskiej osoby lub inwestycja. Aby cieszyć się jej pięknem jak najdłużej, warto znać kilka zasad pielęgnacji.</p><h3>Złoto — ponadczasowy blask</h3><ul><li>Zdejmuj biżuterię przed myciem naczyń i ćwiczeniami</li><li>Unikaj kontaktu z perfumami i kremami</li><li>Czyść miękką szmatką z mikrofibry</li><li>Głębsze czyszczenie: ciepła woda z płynem, miękka szczoteczka</li></ul><h3>Srebro — jak zapobiec ciemnieniu?</h3><ul><li>Noś regularnie — tłuszcze skóry chronią przed utlenianiem</li><li>Przechowuj w zamkniętych torebkach antyoksydacyjnych</li><li>Czyść specjalnymi ściereczkami do srebra</li><li>Nie używaj pasty do zębów — może zarysować powierzchnię</li></ul><p>Zapraszamy do naszego zakładu w Bolesławcu po profesjonalne środki do pielęgnacji biżuterii.</p>",
  },
  {
    name: "Kiedy wymienić baterię w zegarku? Poradnik",
    date: "2026-02-15",
    author: "Zegarmistrzostwo",
    active: 1,
    lang_id: "1",
    seo_title: "Kiedy wymienić baterię w zegarku — poradnik",
    seo_description: "Dowiedz się, kiedy wymienić baterię w zegarku kwarcowym.",
    seo_url: "kiedy-wymienic-baterie-w-zegarku",
    short_content: "Zegarek kwarcowy zaczyna się spóźniać lub zatrzymał się? To pora na wymianę baterii.",
    content: "<h2>Kiedy wymienić baterię w zegarku?</h2><p>Zegarki kwarcowe to jedne z najpopularniejszych zegarków na świecie. Ale nawet najlepsza bateria kiedyś się wyczerpie.</p><h3>Objawy słabnącej baterii</h3><ul><li>Sekundnik skacze co 2 sekundy (wskaźnik EOL)</li><li>Zegarek się spóźnia</li><li>Zegarek zatrzymał się</li><li>Funkcje elektroniczne nie działają</li></ul><h3>Dlaczego nie warto zwlekać?</h3><ul><li>Ryzyko wycieku baterii i uszkodzenia mechanizmu</li><li>Wysychanie uszczelek</li><li>Wysychanie smarowania mechanizmu</li></ul><p>W naszym zakładzie wymienimy baterię od ręki, w 15-30 minut. Cena: od 30 zł. Zapraszamy — ul. Sierpnia 80, lok. 12/13, Bolesławiec.</p>",
  },
];

for (const post of posts) {
  const id = await api("/news", { method: "POST", body: JSON.stringify(post) });
  console.log("Created:", post.name, "ID:", id);
}
console.log("Done!");
