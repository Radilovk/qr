export default {
  async fetch(request, env, ctx) {
    // Извличане на кода от URL: /lidagreen/XXXXXX
    const url = new URL(request.url);
    const path = url.pathname.split("/");
    const code = path[path.length - 1];

    // Разрешаваме само 6-цифрени кодове (напр. 123456)
    if (!/^\d{6}$/.test(code)) {
      return new Response(JSON.stringify({ status: "invalid" }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // --- MVP режим: embed-нат списък от валидни кодове ---
    // ! ЗА ПРОДУКЦИЯ: препоръчвам Cloudflare KV Storage!
    const validCodes = new Set([
      "123456", "654321", "777888", "111222", "234567"
      // ...тук сложи твоите истински кодове
    ]);

    if (validCodes.has(code)) {
      return new Response(JSON.stringify({ status: "valid" }), {
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({ status: "invalid" }), {
        headers: { "Content-Type": "application/json" }
      });
    }
  }
}
