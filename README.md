# Prospecta Studio · site

Landing page da Prospecta Studio em Next.js 16, Tailwind v4 e Motion. Gera um site 100% estático.

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera o site estático em out/
```

Para publicar, suba a pasta `out/` em qualquer hospedagem estática (Vercel, Netlify, Hostinger...).
Antes do deploy, defina `NEXT_PUBLIC_SITE_URL` com o domínio real, para a prévia de compartilhamento (og.jpg) funcionar.

## Onde mudar

| O quê | Arquivo |
| --- | --- |
| Número do WhatsApp, mensagem padrão, Instagram | `src/lib/site.ts` |
| Pacotes e entregáveis | `src/content/packages.ts` |
| Serviços avulsos e categorias | `src/content/services.ts` |
| Cores, fontes e efeitos da marca | `src/app/globals.css` (bloco `@theme`) |
| Símbolo da marca e fundo de estrelas (SVG) | `public/brand/` (`mark.svg`, `mark-muted.svg`, `stars.svg`) |

Todo CTA abre o WhatsApp com uma mensagem pronta: geral, por serviço ("Quero um orçamento de...") ou por pacote ("Tenho interesse no pacote...").
