import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(import.meta.dirname, "../../.env.local") });

const SITE_URL = process.env.SHOPER_SITE_URL!.replace(/\/+$/, "");
const LOGIN = process.env.SHOPER_LOGIN!;
const PASSWORD = process.env.SHOPER_PASSWORD!;

let token: string | null = null;

async function auth(): Promise<string> {
  if (token) return token;
  const res = await fetch(`${SITE_URL}/webapi/rest/auth`, {
    method: "POST",
    headers: { Authorization: `Basic ${Buffer.from(`${LOGIN}:${PASSWORD}`).toString("base64")}` },
  });
  if (!res.ok) throw new Error(`Auth failed: ${res.status}`);
  const data = (await res.json()) as { access_token: string };
  token = data.access_token;
  return token;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function api(path: string, opts: RequestInit = {}, retries = 5): Promise<unknown> {
  const t = await auth();
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(`${SITE_URL}/webapi/rest${path}`, {
      ...opts,
      headers: { Authorization: `Bearer ${t}`, "Content-Type": "application/json", ...opts.headers },
    });
    if (res.status === 429) {
      const wait = 2000 * (attempt + 1);
      console.log(`    [rate-limited] waiting ${wait}ms before retry...`);
      await sleep(wait);
      continue;
    }
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`API ${opts.method || "GET"} ${path} → ${res.status}: ${body}`);
    }
    if (res.status === 204) return null;
    return res.json();
  }
  throw new Error(`API ${opts.method || "GET"} ${path} → still rate-limited after ${retries} retries`);
}

// ── Helpers ──

async function listAll(endpoint: string): Promise<{ list: Array<Record<string, unknown>>; count: number }> {
  const first = (await api(`${endpoint}?limit=50&page=1`)) as { count: string; pages: number; list: Array<Record<string, unknown>> };
  const all = [...first.list];
  for (let p = 2; p <= first.pages; p++) {
    const page = (await api(`${endpoint}?limit=50&page=${p}`)) as { list: Array<Record<string, unknown>> };
    all.push(...page.list);
  }
  return { list: all, count: parseInt(first.count) };
}

async function deleteAll(endpoint: string, idKey: string) {
  const { list, count } = await listAll(endpoint);
  console.log(`  Found ${count} items in ${endpoint}`);
  for (const item of list) {
    const id = item[idKey];
    try {
      await api(`${endpoint}/${id}`, { method: "DELETE" });
      console.log(`    Deleted ${endpoint}/${id}`);
    } catch (e: unknown) {
      console.warn(`    Failed to delete ${endpoint}/${id}: ${(e as Error).message}`);
    }
  }
}

// ── Step 2: Delete demo content ──

async function cleanUp() {
  console.log("\n=== STEP 2: Delete demo content ===\n");

  console.log("Deleting products...");
  await deleteAll("/products", "product_id");

  console.log("Deleting categories...");
  await deleteAll("/categories", "category_id");

  console.log("Deleting news...");
  await deleteAll("/news", "news_id");

  console.log("\nCleanup complete.");
}

// ── Step 3: Create categories ──

interface CreatedCategory {
  name: string;
  id: number;
  children: { name: string; id: number }[];
}

async function createCategories(): Promise<CreatedCategory[]> {
  console.log("\n=== STEP 3: Create categories ===\n");

  const structure = [
    {
      name: "Biżuteria",
      description: "Pierścionki, naszyjniki, kolczyki i bransoletki ze złota i srebra",
      seo_title: "Biżuteria — Zegarmistrzostwo",
      seo_description: "Elegancka biżuteria ze złota i srebra. Pierścionki, naszyjniki, kolczyki i bransoletki w sklepie Zegarmistrzostwo w Bolesławcu.",
      children: [
        { name: "Pierścionki", description: "Pierścionki zaręczynowe i ozdobne" },
        { name: "Naszyjniki", description: "Naszyjniki i wisiorki ze złota i srebra" },
        { name: "Kolczyki", description: "Kolczyki srebrne i złote" },
        { name: "Bransoletki", description: "Bransoletki srebrne i złote" },
      ],
    },
    {
      name: "Zegarki",
      description: "Zegarki damskie, męskie i sportowe renomowanych marek",
      seo_title: "Zegarki — Zegarmistrzostwo",
      seo_description: "Zegarki damskie, męskie i sportowe. Casio, G-Shock i inne marki w sklepie Zegarmistrzostwo w Bolesławcu.",
      children: [
        { name: "Zegarki damskie", description: "Eleganckie zegarki damskie" },
        { name: "Zegarki męskie", description: "Zegarki męskie klasyczne i sportowe" },
        { name: "Zegarki sportowe", description: "Zegarki sportowe G-Shock i inne" },
      ],
    },
    {
      name: "Serwis",
      description: "Usługi zegarmistrzowskie — naprawy, przeglądy, wymiana baterii",
      seo_title: "Serwis zegarków — Zegarmistrzostwo",
      seo_description: "Profesjonalny serwis zegarków w Bolesławcu. Wymiana baterii, przegląd mechanizmu, regulacja bransolety.",
      children: [],
    },
  ];

  const results: CreatedCategory[] = [];

  for (const cat of structure) {
    const parentId = (await api("/categories", {
      method: "POST",
      body: JSON.stringify({
        parent_id: 0,
        order: structure.indexOf(cat),
        translations: {
          pl_PL: {
            name: cat.name,
            active: "1",
            description: cat.description,
            seo_title: cat.seo_title,
            seo_description: cat.seo_description,
          },
        },
      }),
    })) as number;
    console.log(`  Created root category: ${cat.name} (ID: ${parentId})`);

    const children: { name: string; id: number }[] = [];
    for (const sub of cat.children) {
      const childId = (await api("/categories", {
        method: "POST",
        body: JSON.stringify({
          parent_id: parentId,
          order: cat.children.indexOf(sub),
          translations: {
            pl_PL: {
              name: sub.name,
              active: "1",
              description: sub.description,
            },
          },
        }),
      })) as number;
      console.log(`    Created subcategory: ${sub.name} (ID: ${childId})`);
      children.push({ name: sub.name, id: childId });
    }

    results.push({ name: cat.name, id: parentId, children });
  }

  return results;
}

// ── Step 4: Create products ──

async function createProducts(cats: CreatedCategory[]) {
  console.log("\n=== STEP 4: Create products ===\n");

  const bizuteria = cats.find((c) => c.name === "Biżuteria")!;
  const zegarki = cats.find((c) => c.name === "Zegarki")!;
  const serwis = cats.find((c) => c.name === "Serwis")!;

  const pierscionki = bizuteria.children.find((c) => c.name === "Pierścionki")!;
  const naszyjniki = bizuteria.children.find((c) => c.name === "Naszyjniki")!;
  const kolczyki = bizuteria.children.find((c) => c.name === "Kolczyki")!;
  const bransoletki = bizuteria.children.find((c) => c.name === "Bransoletki")!;
  const zDamskie = zegarki.children.find((c) => c.name === "Zegarki damskie")!;
  const zMeskie = zegarki.children.find((c) => c.name === "Zegarki męskie")!;
  const zSportowe = zegarki.children.find((c) => c.name === "Zegarki sportowe")!;

  const products = [
    // Biżuteria
    {
      category_id: pierscionki.id,
      code: "PIER-MOISS-1CT",
      stock: { price: 2400, stock: 5, weight: 0.01 },
      translations: {
        pl_PL: {
          name: "Pierścionek z moissanitem 1ct, złoto 585",
          active: "1",
          short_description: "Elegancki pierścionek zaręczynowy z moissanitem 1ct osadzonym w złocie 585. Klasyczny design solitaire.",
          description: "<h2>Pierścionek z moissanitem 1ct</h2><p>Piękny pierścionek zaręczynowy z kamieniem moissanit o masie 1 karata, osadzonym w oprawie ze złota próby 585 (14K). Moissanit to kamień o wyjątkowym blasku, przewyższającym brylant pod względem współczynnika refrakcji.</p><ul><li>Kamień: moissanit 1ct, szlif brylantowy</li><li>Metal: złoto 585 (14K), kolor do wyboru</li><li>Oprawa: klasyczny solitaire z 6 łapkami</li><li>Certyfikat autentyczności w zestawie</li></ul>",
          seo_title: "Pierścionek z moissanitem 1ct złoto 585 — Zegarmistrzostwo",
          seo_description: "Pierścionek zaręczynowy z moissanitem 1ct w złocie 585. Elegancki solitaire w sklepie Zegarmistrzostwo Bolesławiec.",
        },
      },
    },
    {
      category_id: naszyjniki.id,
      code: "NASZ-TOPAZ-LB",
      stock: { price: 1800, stock: 3, weight: 0.015 },
      translations: {
        pl_PL: {
          name: "Naszyjnik złoty z topazem London Blue",
          active: "1",
          short_description: "Delikatny naszyjnik ze złota 585 z naturalnym topazem London Blue. Długość łańcuszka 45 cm.",
          description: "<h2>Naszyjnik z topazem London Blue</h2><p>Subtelny naszyjnik z wisiorkiem osadzonym naturalnym topazem London Blue o intensywnym, głębokim niebieskim kolorze. Łańcuszek ze złota próby 585.</p><ul><li>Kamień: topaz London Blue, naturalny</li><li>Metal: złoto 585 (14K)</li><li>Łańcuszek: 45 cm, ankier</li><li>Zapięcie: karabińczyk</li></ul>",
          seo_title: "Naszyjnik złoty z topazem London Blue — Zegarmistrzostwo",
          seo_description: "Złoty naszyjnik z naturalnym topazem London Blue. Biżuteria ze złota 585 w sklepie Zegarmistrzostwo Bolesławiec.",
        },
      },
    },
    {
      category_id: kolczyki.id,
      code: "KOLC-MORG-SR",
      stock: { price: 450, stock: 8, weight: 0.005 },
      translations: {
        pl_PL: {
          name: "Kolczyki srebrne z morganitem",
          active: "1",
          short_description: "Kolczyki sztyfty ze srebra 925 z różowymi morganitami. Idealne na co dzień i na wyjątkowe okazje.",
          description: "<h2>Kolczyki srebrne z morganitem</h2><p>Eleganckie kolczyki typu sztyfty wykonane ze srebra próby 925, ozdobione naturalnymi morganitami o delikatnym różowym odcieniu.</p><ul><li>Kamień: morganit naturalny, szlif okrągły</li><li>Metal: srebro 925 rodowane</li><li>Zapięcie: sztyft z motylkiem</li><li>Średnica kamienia: ok. 5 mm</li></ul>",
          seo_title: "Kolczyki srebrne z morganitem — Zegarmistrzostwo",
          seo_description: "Srebrne kolczyki z naturalnym morganitem. Biżuteria srebrna w sklepie Zegarmistrzostwo Bolesławiec.",
        },
      },
    },
    {
      category_id: bransoletki.id,
      code: "BRANS-CYR-SR",
      stock: { price: 350, stock: 10, weight: 0.02 },
      translations: {
        pl_PL: {
          name: "Bransoletka srebrna z cyrkoniami",
          active: "1",
          short_description: "Błyszcząca bransoletka tenisowa ze srebra 925 z cyrkoniami. Długość regulowana 17-20 cm.",
          description: "<h2>Bransoletka srebrna z cyrkoniami</h2><p>Klasyczna bransoletka tenisowa wykonana ze srebra 925 rodowanego, wysadzana cyrkoniami o szlifie brylantowym. Elegancki dodatek na każdą okazję.</p><ul><li>Metal: srebro 925 rodowane</li><li>Kamienie: cyrkonie szlif brylantowy</li><li>Długość: 17-20 cm (regulowana)</li><li>Zapięcie: pudełkowe z zabezpieczeniem</li></ul>",
          seo_title: "Bransoletka srebrna z cyrkoniami — Zegarmistrzostwo",
          seo_description: "Srebrna bransoletka tenisowa z cyrkoniami. Biżuteria srebrna w sklepie Zegarmistrzostwo Bolesławiec.",
        },
      },
    },
    // Zegarki
    {
      category_id: zSportowe.id,
      code: "CASIO-GA2100",
      stock: { price: 450, stock: 12, weight: 0.05 },
      translations: {
        pl_PL: {
          name: "Casio G-Shock GA-2100-1AER",
          active: "1",
          short_description: "Kultowy zegarek G-Shock \"CasiOak\". Odporny na wstrząsy, wodoszczelność 200m, podświetlenie LED.",
          description: "<h2>Casio G-Shock GA-2100-1AER</h2><p>Ikona kolekcji G-Shock, znana jako \"CasiOak\" ze względu na ośmiokątną kopertę przypominającą luksusowe zegarki. Łączy wytrzymałość G-Shock z eleganckim, minimalistycznym designem.</p><ul><li>Mechanizm: kwarcowy</li><li>Koperta: żywica wzmacniana włóknem węglowym</li><li>Wodoszczelność: 200 m</li><li>Podświetlenie: Super LED</li><li>Funkcje: stoper, timer, 5 alarmów, kalendarz</li><li>Odporność na wstrząsy (Shock Resistant)</li></ul>",
          seo_title: "Casio G-Shock GA-2100 CasiOak — Zegarmistrzostwo",
          seo_description: "Zegarek Casio G-Shock GA-2100 CasiOak. Kupuj zegarki G-Shock w sklepie Zegarmistrzostwo Bolesławiec.",
        },
      },
    },
    {
      category_id: zDamskie.id,
      code: "ZEG-DAM-CER",
      stock: { price: 680, stock: 6, weight: 0.08 },
      translations: {
        pl_PL: {
          name: "Zegarek damski ceramiczny biały",
          active: "1",
          short_description: "Elegancki zegarek damski z ceramiczną kopertą i bransoletą w kolorze białym. Mechanizm kwarcowy.",
          description: "<h2>Zegarek damski ceramiczny</h2><p>Luksusowy zegarek damski z kopertą i bransoletą wykonaną z wysokogatunkowej ceramiki w kolorze białym. Ceramika jest odporna na zarysowania i hipoalergiczna.</p><ul><li>Koperta: ceramika biała, 32 mm</li><li>Bransoleta: ceramika z zapięciem motylkowym</li><li>Mechanizm: kwarcowy Miyota</li><li>Szkło: szafirowe</li><li>Wodoszczelność: 50 m (5 ATM)</li><li>Tarcza: masa perłowa z indeksami</li></ul>",
          seo_title: "Zegarek damski ceramiczny biały — Zegarmistrzostwo",
          seo_description: "Elegancki biały zegarek damski z ceramiki. Zegarki damskie w sklepie Zegarmistrzostwo Bolesławiec.",
        },
      },
    },
    {
      category_id: zMeskie.id,
      code: "ZEG-MESK-STAL",
      stock: { price: 520, stock: 7, weight: 0.1 },
      translations: {
        pl_PL: {
          name: "Zegarek męski klasyczny stal szlachetna",
          active: "1",
          short_description: "Klasyczny zegarek męski na stalowej bransolecie. Datownik, szkło mineralne, wodoszczelność 100m.",
          description: "<h2>Zegarek męski klasyczny</h2><p>Ponadczasowy zegarek męski na bransolecie ze stali szlachetnej 316L. Elegancki design pasujący zarówno do garnituru, jak i na co dzień.</p><ul><li>Koperta: stal szlachetna 316L, 42 mm</li><li>Bransoleta: stal z zapięciem motylkowym</li><li>Mechanizm: kwarcowy</li><li>Szkło: mineralne hartowane</li><li>Wodoszczelność: 100 m (10 ATM)</li><li>Funkcje: datownik, wskazówki luminescencyjne</li></ul>",
          seo_title: "Zegarek męski klasyczny stal — Zegarmistrzostwo",
          seo_description: "Klasyczny zegarek męski na stalowej bransolecie. Zegarki męskie w sklepie Zegarmistrzostwo Bolesławiec.",
        },
      },
    },
    // Serwis
    {
      category_id: serwis.id,
      code: "SERW-BATERIA",
      stock: { price: 30, stock: 999 },
      translations: {
        pl_PL: {
          name: "Wymiana baterii w zegarku",
          active: "1",
          short_description: "Profesjonalna wymiana baterii w zegarku kwarcowym. Realizacja od ręki w naszym zakładzie w Bolesławcu.",
          description: "<h2>Wymiana baterii w zegarku</h2><p>Szybka i profesjonalna wymiana baterii w zegarkach kwarcowych wszystkich marek. Używamy wyłącznie markowych baterii renomowanych producentów.</p><ul><li>Czas realizacji: od ręki (15-30 minut)</li><li>Baterie: Renata, Maxell, Sony</li><li>Test wodoszczelności po wymianie (opcjonalnie)</li><li>Gwarancja na baterię: 12 miesięcy</li></ul><p><strong>Cena obejmuje baterię i robociznę.</strong></p>",
          seo_title: "Wymiana baterii w zegarku — Zegarmistrzostwo Bolesławiec",
          seo_description: "Wymiana baterii w zegarku od ręki. Profesjonalny serwis zegarków Zegarmistrzostwo w Bolesławcu.",
        },
      },
    },
    {
      category_id: serwis.id,
      code: "SERW-PRZEGLAD",
      stock: { price: 150, stock: 999 },
      translations: {
        pl_PL: {
          name: "Pełny przegląd mechanizmu zegarka",
          active: "1",
          short_description: "Kompletny serwis mechanizmu — czyszczenie, oliwienie, regulacja chodu. Dla zegarków mechanicznych i automatycznych.",
          description: "<h2>Pełny przegląd mechanizmu</h2><p>Kompleksowy serwis zegarków mechanicznych i automatycznych obejmujący demontaż, czyszczenie ultradźwiękowe, oliwienie i precyzyjną regulację chodu.</p><ul><li>Demontaż i inspekcja mechanizmu</li><li>Czyszczenie ultradźwiękowe części</li><li>Wymiana uszczelek</li><li>Oliwienie punktów krytycznych</li><li>Regulacja chodu na maszynie czasowej</li><li>Test wodoszczelności</li></ul><p><strong>Czas realizacji: 5-14 dni roboczych.</strong> Cena może wzrosnąć w przypadku konieczności wymiany części.</p>",
          seo_title: "Przegląd mechanizmu zegarka — Zegarmistrzostwo Bolesławiec",
          seo_description: "Pełny serwis mechanizmu zegarka. Czyszczenie, oliwienie, regulacja chodu w Zegarmistrzostwo Bolesławiec.",
        },
      },
    },
    {
      category_id: serwis.id,
      code: "SERW-REGULACJA",
      stock: { price: 20, stock: 999 },
      translations: {
        pl_PL: {
          name: "Regulacja bransolety / wymiana paska",
          active: "1",
          short_description: "Skrócenie bransolety metalowej lub wymiana paska w zegarku. Realizacja od ręki.",
          description: "<h2>Regulacja bransolety / wymiana paska</h2><p>Dopasowanie bransolety metalowej do nadgarstka (usunięcie lub dodanie ogniw) lub wymiana paska skórzanego/gumowego.</p><ul><li>Regulacja bransolety: usunięcie ogniw, dopasowanie zapięcia</li><li>Wymiana paska: montaż nowego paska (cena paska osobno)</li><li>Czas realizacji: od ręki (10-15 minut)</li></ul><p><strong>Cena dotyczy samej usługi.</strong> Paski dostępne osobno w różnych wariantach.</p>",
          seo_title: "Regulacja bransolety zegarka — Zegarmistrzostwo Bolesławiec",
          seo_description: "Regulacja bransolety i wymiana paska w zegarku. Szybki serwis w Zegarmistrzostwo Bolesławiec.",
        },
      },
    },
  ];

  for (const prod of products) {
    const id = await api("/products", { method: "POST", body: JSON.stringify(prod) });
    console.log(`  Created product: ${prod.translations.pl_PL.name} (ID: ${id})`);
  }
}

// ── Step 5: Update about pages ──

async function updateAboutPages() {
  console.log("\n=== STEP 5: Update about pages ===\n");

  const updates: { id: number; name: string; content: string; seo_title?: string; seo_description?: string }[] = [
    {
      id: 8,
      name: "O firmie",
      seo_title: "O firmie — Zegarmistrzostwo Bolesławiec",
      seo_description: "Zegarmistrzostwo — tradycja zegarmistrzowska i jubilerska w Bolesławcu od pokoleń. Biżuteria, zegarki, profesjonalny serwis.",
      content: `<h2>Zegarmistrzostwo — tradycja i pasja w Bolesławcu</h2>
<p>Witamy w <strong>Zegarmistrzostwo</strong> — zakładzie jubilersko-zegarmistrzowskim z wieloletnią tradycją, działającym w sercu Bolesławca.</p>
<p>Nasza historia to opowieść o pasji do precyzji i piękna. Od lat zajmujemy się sprzedażą biżuterii ze złota i srebra, zegarków renomowanych marek oraz profesjonalnym serwisem zegarmistrzowskim.</p>
<h3>Co nas wyróżnia?</h3>
<ul>
<li><strong>Doświadczenie</strong> — wieloletnia praktyka w rzemiośle zegarmistrzowskim i jubilerskim</li>
<li><strong>Jakość</strong> — starannie dobrane kolekcje biżuterii i zegarków</li>
<li><strong>Profesjonalizm</strong> — fachowy serwis zegarków wszystkich typów</li>
<li><strong>Zaufanie</strong> — setki zadowolonych klientów z Bolesławca i okolic</li>
</ul>
<p>Zapraszamy do odwiedzenia naszego zakładu przy ul. Sierpnia 80, lok. 12/13 w Bolesławcu. Z przyjemnością pomożemy w wyborze idealnego prezentu lub naprawie ulubionego zegarka.</p>`,
    },
    {
      id: 9,
      name: "Kontakt",
      seo_title: "Kontakt — Zegarmistrzostwo Bolesławiec",
      seo_description: "Skontaktuj się z nami. Zegarmistrzostwo, ul. Sierpnia 80, 12/13, 59-700 Bolesławiec. Tel. 75 734 21 19.",
      content: `<h2>Kontakt</h2>
<p><strong>Zegarmistrzostwo</strong></p>
<p>ul. Sierpnia 80, lok. 12/13<br>59-700 Bolesławiec</p>
<p><strong>Telefon:</strong> <a href="tel:+48757342119">75 734 21 19</a></p>
<h3>Godziny otwarcia</h3>
<table>
<tr><td>Poniedziałek – Piątek</td><td>9:00 – 17:00</td></tr>
<tr><td>Sobota</td><td>9:00 – 13:00</td></tr>
<tr><td>Niedziela</td><td>Nieczynne</td></tr>
</table>
<h3>Dojazd</h3>
<p>Zakład znajduje się w centrum Bolesławca, w pasażu handlowym przy ul. Sierpnia 80. Wejście od strony podwórza, lokale 12/13.</p>`,
    },
    {
      id: 1,
      name: "Pytania i odpowiedzi",
      seo_title: "FAQ — Zegarmistrzostwo Bolesławiec",
      seo_description: "Najczęściej zadawane pytania dotyczące biżuterii, zegarków i serwisu w Zegarmistrzostwo Bolesławiec.",
      content: `<h2>Najczęściej zadawane pytania</h2>

<h3>Biżuteria</h3>
<p><strong>Jak dbać o biżuterię ze złota?</strong><br>
Złoto czyść miękką szmatką z mikrofibry. Unikaj kontaktu z perfumami, kremami i środkami chemicznymi. Przechowuj osobno, aby uniknąć zarysowań.</p>

<p><strong>Jak dbać o biżuterię ze srebra?</strong><br>
Srebro naturalnie ciemnieje. Regularne noszenie spowalnia ten proces. Do czyszczenia używaj specjalnych ściereczek do srebra lub kąpieli czyszczącej.</p>

<p><strong>Czy oferujecie grawerowanie?</strong><br>
Tak, oferujemy grawerowanie na biżuterii i zegarkach. Szczegóły i cennik w zakładzie.</p>

<h3>Zegarki</h3>
<p><strong>Jak często wymieniać baterię w zegarku?</strong><br>
Standardowa bateria w zegarku kwarcowym działa 2-3 lata. Zalecamy wymianę zaraz po zauważeniu opóźnienia lub zatrzymania się zegarka.</p>

<p><strong>Jak często serwisować zegarek mechaniczny?</strong><br>
Zalecamy przegląd co 3-5 lat, nawet jeśli zegarek działa prawidłowo. Regularna konserwacja wydłuża żywotność mechanizmu.</p>

<p><strong>Czy naprawiacie zegarki wszystkich marek?</strong><br>
Serwisujemy zegarki większości marek. W przypadku zegarków luksusowych (np. Rolex, Omega) możemy skierować do autoryzowanego serwisu.</p>

<h3>Zakupy</h3>
<p><strong>Czy mogę zamówić biżuterię na specjalne zamówienie?</strong><br>
Tak, realizujemy indywidualne zamówienia. Skontaktuj się z nami, aby omówić projekt i wycenę.</p>

<p><strong>Czy oferujecie pakowanie na prezent?</strong><br>
Każdy zakup pakujemy w eleganckie pudełko. Na życzenie przygotujemy dodatkowe opakowanie prezentowe.</p>`,
    },
    {
      id: 3,
      name: "Regulamin",
      seo_title: "Regulamin sklepu — Zegarmistrzostwo",
      content: `<h2>Regulamin sklepu internetowego Zegarmistrzostwo</h2>
<h3>§1 Postanowienia ogólne</h3>
<p>Sklep internetowy Zegarmistrzostwo, dostępny pod adresem sklep788953.shoparena.pl, prowadzony jest przez Zegarmistrzostwo z siedzibą w Bolesławcu, ul. Sierpnia 80, lok. 12/13, 59-700 Bolesławiec.</p>
<h3>§2 Składanie zamówień</h3>
<p>Zamówienia można składać za pośrednictwem sklepu internetowego 24/7 lub telefonicznie w godzinach pracy zakładu.</p>
<h3>§3 Ceny i płatności</h3>
<p>Wszystkie ceny podane w sklepie są cenami brutto (zawierają podatek VAT). Akceptowane formy płatności: przelew bankowy, płatność przy odbiorze.</p>
<h3>§4 Dostawa</h3>
<p>Czas realizacji zamówienia wynosi od 1 do 5 dni roboczych. Szczegóły dotyczące kosztów dostawy znajdują się w zakładce "Czas i koszty dostawy".</p>
<h3>§5 Zwroty</h3>
<p>Klient ma prawo do odstąpienia od umowy w ciągu 14 dni od otrzymania towaru bez podania przyczyny. Szczegóły w zakładce "Zwroty i reklamacje".</p>`,
    },
    {
      id: 4,
      name: "Czas i koszty dostawy",
      seo_title: "Dostawa — Zegarmistrzostwo",
      seo_description: "Informacje o czasie i kosztach dostawy biżuterii i zegarków ze sklepu Zegarmistrzostwo.",
      content: `<h2>Czas i koszty dostawy</h2>
<p>Wszystkie przesyłki z biżuterią i zegarkami wysyłamy jako <strong>przesyłki ubezpieczone</strong> ze względu na wartość towaru.</p>
<h3>Metody dostawy</h3>
<table>
<tr><th>Metoda</th><th>Czas</th><th>Koszt</th></tr>
<tr><td>Kurier DPD (ubezpieczona)</td><td>1-2 dni robocze</td><td>18 zł</td></tr>
<tr><td>Kurier InPost (ubezpieczona)</td><td>1-2 dni robocze</td><td>16 zł</td></tr>
<tr><td>Odbiór osobisty — Bolesławiec</td><td>W godzinach pracy</td><td>0 zł</td></tr>
</table>
<p><strong>Darmowa dostawa</strong> przy zamówieniach powyżej 500 zł.</p>
<h3>Pakowanie</h3>
<p>Biżuteria wysyłana jest w eleganckich pudełkach, zabezpieczonych dodatkowym opakowaniem. Zegarki pakujemy w oryginalne pudełka producenta.</p>`,
    },
    {
      id: 7,
      name: "Zwroty i reklamacje",
      seo_title: "Zwroty i reklamacje — Zegarmistrzostwo",
      content: `<h2>Zwroty i reklamacje</h2>
<h3>Prawo do odstąpienia od umowy</h3>
<p>Mają Państwo prawo odstąpić od umowy w terminie <strong>14 dni</strong> bez podawania przyczyny. Termin biegnie od dnia otrzymania towaru.</p>
<p>Aby skorzystać z prawa odstąpienia, prosimy o kontakt:</p>
<ul>
<li>Telefoniczny: 75 734 21 19</li>
<li>Osobisty: ul. Sierpnia 80, lok. 12/13, 59-700 Bolesławiec</li>
</ul>
<h3>Reklamacje</h3>
<p>Reklamacje rozpatrujemy w terminie 14 dni od otrzymania zgłoszenia. Towar reklamowany prosimy dostarczyć osobiście lub przesłać na adres zakładu.</p>
<p><strong>Uwaga:</strong> Usługi serwisowe (wymiana baterii, przegląd mechanizmu) objęte są osobną gwarancją określoną na paragonie.</p>`,
    },
  ];

  for (const page of updates) {
    const { id, ...body } = page;
    await api(`/aboutpages/${id}`, { method: "PUT", body: JSON.stringify(body) });
    console.log(`  Updated page: ${page.name} (ID: ${id})`);
  }
}

// ── Step 6: Create blog posts ──

async function createBlogPosts() {
  console.log("\n=== STEP 6: Create blog posts ===\n");

  const posts = [
    {
      name: "Jak dbać o biżuterię ze złota i srebra",
      date: "2026-03-01",
      author: "Zegarmistrzostwo",
      active: 1,
      lang_id: "1",
      seo_title: "Jak dbać o biżuterię ze złota i srebra — poradnik",
      seo_description: "Praktyczne porady dotyczące pielęgnacji biżuterii ze złota i srebra. Dowiedz się, jak utrzymać blask swoich klejnotów.",
      seo_url: "jak-dbac-o-bizuterie-ze-zlota-i-srebra",
      // tags removed — Shoper requires existing tag IDs
      short_content: "Biżuteria ze złota i srebra wymaga odpowiedniej pielęgnacji, aby zachować swój blask na lata. Podpowiadamy, jak prawidłowo czyścić i przechowywać swoje ulubione ozdoby.",
      content: `<h2>Jak dbać o biżuterię ze złota i srebra?</h2>

<p>Biżuteria to nie tylko ozdoba — to często pamiątka, prezent od bliskiej osoby lub inwestycja. Aby cieszyć się jej pięknem jak najdłużej, warto znać kilka zasad pielęgnacji.</p>

<h3>Złoto — ponadczasowy blask</h3>
<p>Złoto jest metalem szlachetnym odpornym na korozję, ale mimo to wymaga dbałości:</p>
<ul>
<li><strong>Zdejmuj biżuterię</strong> przed myciem naczyń, kąpielą w basenie i ćwiczeniami fizycznymi</li>
<li><strong>Unikaj kontaktu</strong> z perfumami, kremami i środkami czyszczącymi — nakładaj je przed założeniem biżuterii</li>
<li><strong>Czyść regularnie</strong> miękką szmatką z mikrofibry</li>
<li><strong>Głębsze czyszczenie:</strong> namocz w ciepłej wodzie z odrobiną płynu do naczyń na 15 minut, delikatnie wyczyść miękką szczoteczką</li>
</ul>

<h3>Srebro — jak zapobiec ciemnieniu?</h3>
<p>Srebro naturalnie reaguje z siarką obecną w powietrzu, co powoduje ciemnienie (patynę). Oto jak temu zapobiec:</p>
<ul>
<li><strong>Noś regularnie</strong> — naturalne tłuszcze skóry chronią srebro przed utlenianiem</li>
<li><strong>Przechowuj w zamkniętych torebkach</strong> antyoksydacyjnych lub z tabletką kredy</li>
<li><strong>Czyść specjalnymi ściereczkami</strong> do srebra — dostępne w naszym sklepie</li>
<li><strong>Nie używaj pasty do zębów!</strong> — wbrew popularnym radom, może zarysować powierzchnię</li>
</ul>

<h3>Kamienie szlachetne</h3>
<p>Kamienie osadzone w biżuterii wymagają dodatkowej uwagi:</p>
<ul>
<li>Unikaj uderzeń — nawet diament może pęknąć przy silnym uderzeniu w odpowiednim kącie</li>
<li>Regularnie sprawdzaj oprawę — luźny kamień łatwo zgubić</li>
<li>Profesjonalne czyszczenie ultradźwiękowe zalecamy raz w roku</li>
</ul>

<p>Zapraszamy do naszego zakładu w Bolesławcu po profesjonalne środki do pielęgnacji biżuterii oraz po fachową poradę.</p>`,
    },
    {
      name: "Kiedy wymienić baterię w zegarku? Poradnik",
      date: "2026-02-15",
      author: "Zegarmistrzostwo",
      active: 1,
      lang_id: "1",
      seo_title: "Kiedy wymienić baterię w zegarku — poradnik",
      seo_description: "Dowiedz się, kiedy wymienić baterię w zegarku kwarcowym. Objawy słabnącej baterii i dlaczego nie warto zwlekać z wymianą.",
      seo_url: "kiedy-wymienic-baterie-w-zegarku",
      // tags removed — Shoper requires existing tag IDs
      short_content: "Zegarek kwarcowy zaczyna się spóźniać lub zatrzymał się? To najprawdopodobniej pora na wymianę baterii. Podpowiadamy, na co zwrócić uwagę i dlaczego nie warto odkładać wizyty u zegarmistrza.",
      content: `<h2>Kiedy wymienić baterię w zegarku?</h2>

<p>Zegarki kwarcowe to jedne z najpopularniejszych zegarków na świecie — precyzyjne, niezawodne i niewymagające codziennego nakręcania. Ale nawet najlepsza bateria kiedyś się wyczerpie. Jak rozpoznać, że pora na wymianę?</p>

<h3>Objawy słabnącej baterii</h3>
<ul>
<li><strong>Sekundnik skacze co 2 sekundy</strong> — wiele zegarków ma wbudowany wskaźnik EOL (End of Life), który powoduje skok sekundnika co 2 sekundy zamiast co 1</li>
<li><strong>Zegarek się spóźnia</strong> — jeśli zegarek kwarcowy zaczyna tracić czas, to prawie zawsze oznacza słabnącą baterię</li>
<li><strong>Zegarek zatrzymał się</strong> — oczywisty sygnał, ale nie odkładaj wymiany!</li>
<li><strong>Funkcje elektroniczne nie działają</strong> — podświetlenie, alarmy czy stoper mogą przestać działać przed zatrzymaniem się wskazówek</li>
</ul>

<h3>Dlaczego nie warto zwlekać?</h3>
<p>Wyczerpana bateria to nie tylko zatrzymany zegarek. Oto dlaczego szybka wymiana jest ważna:</p>
<ul>
<li><strong>Ryzyko wycieku</strong> — stara bateria może wyciec i uszkodzić mechanizm. Naprawa jest wtedy wielokrotnie droższa niż wymiana baterii</li>
<li><strong>Uszczelki</strong> — im dłużej zegarek stoi, tym szybciej wysychają uszczelki, pogarszając wodoszczelność</li>
<li><strong>Smarowanie</strong> — mechanizm kwarcowy też wymaga smarowania, które wysycha gdy zegarek nie pracuje</li>
</ul>

<h3>Jak często wymieniać baterię?</h3>
<table>
<tr><th>Typ zegarka</th><th>Żywotność baterii</th></tr>
<tr><td>Standardowy kwarcowy</td><td>2-3 lata</td></tr>
<tr><td>Zegarek z chronografem</td><td>1-2 lata</td></tr>
<tr><td>Casio G-Shock</td><td>3-5 lat</td></tr>
<tr><td>Zegarek z podświetleniem</td><td>1-2 lata</td></tr>
</table>

<h3>Wymiana baterii w Zegarmistrzostwo</h3>
<p>W naszym zakładzie w Bolesławcu wymienimy baterię w Twoim zegarku <strong>od ręki</strong>, w ciągu 15-30 minut. Używamy wyłącznie markowych baterii (Renata, Maxell) i na życzenie wykonujemy test wodoszczelności po wymianie.</p>
<p><strong>Cena: od 30 zł</strong> (bateria + robocizna)</p>
<p>Zapraszamy — ul. Sierpnia 80, lok. 12/13, Bolesławiec. Tel. 75 734 21 19.</p>`,
    },
  ];

  for (const post of posts) {
    const id = await api("/news", { method: "POST", body: JSON.stringify(post) });
    console.log(`  Created blog post: ${post.name} (ID: ${id})`);
  }
}

// ── Main ──

async function main() {
  console.log("Starting Zegarmistrzostwo store setup...\n");

  await cleanUp();
  const cats = await createCategories();
  await createProducts(cats);
  await updateAboutPages();
  await createBlogPosts();

  console.log("\n=== ALL DONE ===");
  console.log("Visit: https://sklep788953.shoparena.pl/");
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
