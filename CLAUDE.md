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
| Transição entre páginas (cortina com o acento da área de destino) | `src/components/ui/PageTransition.tsx` + bloco `.page-transition` em `globals.css` |
| Títulos que entram palavra por palavra | `src/components/ui/SplitText.tsx` (envolva o conteúdo do `h2`) |
| Equipe (usada em "Quem faz" e "Quem cuida") | `src/content/team.ts` |

## Regras de design
- Paleta da marca: fundo `void #06020f`, violeta `brand-*`, prata metálica (`text-metal`). Destaque de títulos = palavra em itálico light com `text-violet`.
- Cada área de serviço tem um acento próprio ao lado do violeta (Web violeta, Design rosa, Vídeo coral, Estratégia ciano). Use `data-area="<slug>"` (ou a prop `area` do `Reveal`) e as classes `accent`, `accent-light`, `accent-strong`, `text-accent-gradient`. Os valores ficam em `globals.css`; o fundo continua sempre escuro.
- Cards são superfícies planas com borda fina (1px): `panel` (base), `card-area` (leve tom do acento da área; em links, `hover:border-accent/40`) e `card-accent` (bloco sólido no acento, um por grupo). Sem sombra colorida, sem borda em gradiente, sem brilho embaixo, sem "levantar" no hover. Ícones de área aparecem soltos na cor do acento (peso `light`), não dentro de quadrados coloridos.
- Navegação para as áreas usa `AreaLink` (pílula com contorno); CTAs continuam com `WhatsAppButton`.
- Oferta em três formatos, apresentados na seção "Como contratar" (`Offerings.tsx`): serviços avulsos, pacotes mensais e combos (pacote + site). O Launch já inclui site e fica fora dos combos (`includesSite`).
- Links internos para outras páginas usam `next/link`; os do menu são absolutos (`/#pacotes`) para funcionar a partir das páginas de serviço.
- Botões: todos os CTAs usam `WhatsAppButton` com o rótulo "Agendar orçamento" e mensagem específica (pacote ou serviço). Preenchimento sólido, sem brilho. Alturas fixas: `sm` 40px (só no header), `md` 48px (padrão), `lg` 56px (só no hero e no CTA final). Variante `light` em fundos de acento. Hover: rótulo rola (`.roll`) e a seta troca (`.arrow-swap`).
- Formas: botões em pílula; painéis `rounded-3xl`.
- Sem travessão (— ou –) nos textos visíveis. Sem números, depoimentos ou cases inventados: use só dados reais (Notion, portfólio).
- Site só escuro: mantenha `color-scheme: only dark` e o bloco `@media (prefers-color-scheme: dark)` em `globals.css`. É o que impede o Samsung Internet de escurecer o site.

## Performance
- Anime só `transform` e `opacity`. Nada de SMIL, `filter: blur` grande, `mix-blend-mode` ou `backdrop-blur` em listas.
- No Tailwind v4, `translate-*`/`rotate-*`/`scale-*` usam as propriedades CSS `translate`/`rotate`/`scale`, que somam com `transform`. Em elementos animados via `transform` (WAAPI, Motion), defina o estado inicial com `style={{ transform }}`, não com classe.
- A transição de página intercepta cliques em links internos para outra rota (fase de captura) e só chama `router.push` com a tela coberta. Links com âncora na mesma página, nova aba, cliques com modificador e `prefers-reduced-motion` ficam de fora. O `data-scroll-behavior="smooth"` no `<html>` faz o Next pular direto para o topo ou âncora por baixo da cortina.
- Satélites orbitais: `OrbitDot` (CSS no compositor), não `animateMotion`.
- Imagens: WebP pré-otimizado, `<img loading="lazy">` com `width`/`height`.
- Lighthouse local varia muito com a máquina ocupada; compare versões alternando execuções.

## Verificação e deploy
- Confira desktop (1440) e mobile (390): sem scroll horizontal, console sem erros.
- Deploy: push na `main` deveria publicar sozinho, mas a integração GitHub → Vercel falhou recentemente. Se nenhum deploy novo aparecer em `npx vercel ls prospecta-site`, publique com `npx vercel deploy --prod --yes`. Se produção mostrar CSS antigo (cores de área sumindo), use `--force` para ignorar o cache de build.
- A variável `NEXT_PUBLIC_SITE_URL` está configurada na Vercel. Se trocar de domínio, atualize-a.
