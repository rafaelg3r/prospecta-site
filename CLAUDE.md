@AGENTS.md

# Prospecta Studio · site

Landing page da Prospecta Studio. Next.js 16 (App Router, **export estático**), Tailwind v4, Motion (`motion/react` com `LazyMotion` + `m.*`), ícones Phosphor.

- Produção: https://prospecta-site-sooty.vercel.app (projeto Vercel `rafaelg3rs-projects/prospecta-site`)
- Repositório: https://github.com/rafaelg3r/prospecta-site (branch `main`)

## Antes de mexer
- Next 16 tem mudanças incompatíveis: leia `node_modules/next/dist/docs/` antes de alterar config ou APIs.
- `output: "export"` não aceita `cacheComponents` nem `partialPrefetching` (PPR). Não reative.
- Rode `npm run lint` e `npm run build` antes de qualquer commit.
- O cache em disco do Turbopack fica desligado em `next.config.ts` (`turbopackFileSystemCacheFor*`): com o loader do Tailwind ele servia um `globals.css` antigo no dev e em produção. Não reative.

## Onde fica cada coisa
| O quê | Onde |
| --- | --- |
| WhatsApp, mensagem padrão, Instagram, links do menu | `src/lib/site.ts` |
| Pacotes (preços mensais do Notion) | `src/content/packages.ts` |
| Serviços por área (preços, processo, textos das páginas) | `src/content/services.ts` |
| Páginas de cada área (`/servicos/web`, `design`, `estrategia`, `video`) | `src/app/servicos/[area]/page.tsx` + `src/components/service/` (hero próprio por área em `service/heroes/`) |
| Combos (pacote + site): sites, preços e desconto (10% no site) | `src/content/combos.ts` |
| Portfólio (sites e posts) | `src/content/portfolio.ts` + imagens em `public/work/` (WebP) |
| Cores, fontes, animações | `src/app/globals.css` (bloco `@theme`) |
| Logo e fundo de estrelas | `public/brand/` |
| Seções da página | `src/components/sections/` |
| Equipe (usada em "Quem faz" e "Quem cuida") | `src/content/team.ts` |

## Regras de design
- Paleta da marca: fundo `void #06020f`, violeta `brand-*`, prata metálica (`text-metal`). Destaque de títulos = palavra em itálico light com `text-violet`.
- Cada área de serviço tem um acento próprio ao lado do violeta (Web violeta, Design rosa, Vídeo coral, Estratégia ciano). Use `data-area="<slug>"` (ou a prop `area` do `Reveal`) e as classes `accent`, `accent-light`, `accent-strong`, `text-accent-gradient`. Os valores ficam em `globals.css`; o fundo continua sempre escuro.
- Cards: `panel` (base), `card-vivid` (borda em gradiente e brilho no acento) e `card-accent` (preenchido com o acento, um por grupo). Navegação para as áreas usa `AreaLink`; CTAs continuam com `WhatsAppButton`.
- Oferta em três formatos, apresentados na seção "Como contratar" (`Offerings.tsx`): serviços avulsos, pacotes mensais e combos (pacote + site). O Launch já inclui site e fica fora dos combos (`includesSite`).
- Links internos para outras páginas usam `next/link`; os do menu são absolutos (`/#pacotes`) para funcionar a partir das páginas de serviço.
- Botões: todos os CTAs usam `WhatsAppButton` com o rótulo "Agendar orçamento" e mensagem específica (pacote ou serviço). Variante `light` em fundos violeta.
- Formas: botões em pílula; painéis `rounded-3xl`.
- Sem travessão (— ou –) nos textos visíveis. Sem números, depoimentos ou cases inventados: use só dados reais (Notion, portfólio).
- Site só escuro: mantenha `color-scheme: only dark` e o bloco `@media (prefers-color-scheme: dark)` em `globals.css`. É o que impede o Samsung Internet de escurecer o site.

## Performance
- Anime só `transform` e `opacity`. Nada de SMIL, `filter: blur` grande, `mix-blend-mode` ou `backdrop-blur` em listas.
- Satélites orbitais: `OrbitDot` (CSS no compositor), não `animateMotion`.
- Imagens: WebP pré-otimizado, `<img loading="lazy">` com `width`/`height`.
- Lighthouse local varia muito com a máquina ocupada; compare versões alternando execuções.

## Verificação e deploy
- Confira desktop (1440) e mobile (390): sem scroll horizontal, console sem erros.
- Deploy: push na `main` deveria publicar sozinho, mas a integração GitHub → Vercel falhou recentemente. Se nenhum deploy novo aparecer em `npx vercel ls prospecta-site`, publique com `npx vercel deploy --prod --yes`. Se produção mostrar CSS antigo (cores de área sumindo), use `--force` para ignorar o cache de build.
- A variável `NEXT_PUBLIC_SITE_URL` está configurada na Vercel. Se trocar de domínio, atualize-a.
