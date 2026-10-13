"use client";

import { Browsers, RocketLaunch, Tag } from "@phosphor-icons/react";
import { AnimatePresence, m } from "motion/react";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { COMBO_DISCOUNT_LABEL, COMBO_SITE_DISCOUNT, comboSitePrice, sites } from "@/content/combos";
import { packages } from "@/content/packages";
import { serviceHref } from "@/content/services";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";

// Packages that already ship with a site (Launch) are not sold as combos.
export const comboPackages = packages.filter((p) => !p.includesSite);
const launch = packages.find((p) => p.includesSite);

const discountPercent = Math.round(COMBO_SITE_DISCOUNT * 100);

// Crossfades a value when the selection changes (opacity + transform only).
function Swap({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.span
        key={id}
        className={cn("block", className)}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </m.span>
    </AnimatePresence>
  );
}

type OptionProps = {
  name: string;
  value: string;
  checked: boolean;
  onSelect: (value: string) => void;
  title: string;
  detail: string;
};

function Option({ name, value, checked, onSelect, title, detail }: OptionProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-full border px-4 py-2.5 transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-300 sm:gap-4 sm:rounded-2xl sm:px-5 sm:py-4",
        checked ? "border-brand-400/60 bg-brand-500/15" : "border-white/10 bg-white/[0.03] hover:border-white/25",
      )}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onSelect(value)} className="sr-only" />
      <span
        aria-hidden
        className={cn(
          "inline-flex size-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300 sm:size-5",
          checked ? "border-brand-300" : "border-white/25",
        )}
      >
        <span
          className={cn(
            "size-1.5 rounded-full bg-brand-200 transition-[opacity,transform] duration-300 ease-out-expo sm:size-2.5",
            checked ? "scale-100 opacity-100" : "scale-50 opacity-0",
          )}
        />
      </span>
      <span className="flex min-w-0 flex-1 items-baseline justify-between gap-4">
        <span className="font-display font-semibold text-ink sm:text-lg">{title}</span>
        <span className="hidden text-sm text-mute sm:block">{detail}</span>
      </span>
    </label>
  );
}

function Step({ n, children }: { n: number; children: ReactNode }) {
  return (
    <legend className="flex items-center gap-3 font-display text-xl font-semibold text-ink">
      <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/15 text-sm text-brand-200">{n}</span>
      {children}
    </legend>
  );
}

type ComboBuilderProps = {
  packageSlug: string;
  onPackageChange: (slug: string) => void;
};

export function ComboBuilder({ packageSlug, onPackageChange }: ComboBuilderProps) {
  const [siteSlug, setSiteSlug] = useState("site-completo");

  const pkg = comboPackages.find((p) => p.slug === packageSlug) ?? comboPackages[0];
  const site = sites.find((s) => s.slug === siteSlug) ?? sites[0];

  const siteMin = comboSitePrice(site.priceMin);
  const siteMax = comboSitePrice(site.priceMax);
  const saving = formatPrice(site.priceMin - siteMin, site.priceMax - siteMax);
  const key = `${pkg.slug}-${site.slug}`;

  return (
    <section id="combos" className="relative pb-24 pt-12 md:pb-36 md:pt-20">
      <div className="mx-auto grid max-w-[1400px] items-start gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <Reveal className="lg:col-span-5">
          <p className="font-display text-[0.85rem] font-light uppercase italic tracking-[0.42em] text-mute">Combos</p>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink">
            Pacote + site sai mais <span className="text-violet pr-[0.06em] font-light italic">barato.</span>
          </h2>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-mute">
            Junte um pacote mensal a um site novo e pague {discountPercent}% a menos no site do que contratando separado. Escolha as duas
            partes e compare.
          </p>

          <fieldset className="mt-10">
            <Step n={1}>Escolha o pacote</Step>
            <div className="mt-4 flex flex-wrap gap-2 sm:flex-col sm:gap-2.5">
              {comboPackages.map((p) => (
                <Option
                  key={p.slug}
                  name="combo-pacote"
                  value={p.slug}
                  checked={p.slug === pkg.slug}
                  onSelect={onPackageChange}
                  title={p.name}
                  detail={`${formatPrice(p.priceMin, p.priceMax)}/mês`}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-8">
            <Step n={2}>Escolha o site</Step>
            <div className="mt-4 flex flex-wrap gap-2 sm:flex-col sm:gap-2.5">
              {sites.map((s) => (
                <Option
                  key={s.slug}
                  name="combo-site"
                  value={s.slug}
                  checked={s.slug === site.slug}
                  onSelect={setSiteSlug}
                  title={s.name}
                  detail={`avulso ${formatPrice(s.priceMin, s.priceMax)}`}
                />
              ))}
            </div>
          </fieldset>
        </Reveal>

        <Reveal className="order-last -mt-4 lg:order-none lg:col-span-5 lg:col-start-1 lg:-mt-6">
          <ul className="flex flex-col gap-3 text-mute">
            <li className="flex gap-3">
              <Browsers weight="light" className="mt-0.5 size-5 shrink-0 text-brand-300" aria-hidden />
              <span>
                Só precisa do site? Ele também é vendido avulso, sem pacote.{" "}
                <Link
                  href={serviceHref("web")}
                  className="font-semibold text-brand-200 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  Ver sites
                </Link>
              </span>
            </li>
            {launch && (
              <li className="flex gap-3">
                <RocketLaunch weight="light" className="mt-0.5 size-5 shrink-0 text-brand-300" aria-hidden />
                <span>O Prospecta {launch.name} já vem com site incluso.</span>
              </li>
            )}
          </ul>
        </Reveal>

        {/* The combo as a coupon: dark body with the items, violet stub with the saving. */}
        <Reveal delay={0.1} className="relative lg:sticky lg:top-28 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-y-10 inset-x-0 -z-10 lg:-inset-x-6 bg-[radial-gradient(closest-side,rgb(119_68_219/0.3),transparent)]"
          />

          <div className="ticket-top relative isolate overflow-hidden rounded-t-3xl bg-[linear-gradient(165deg,#1d0e55_0%,#110741_55%,#0c0630_100%)] p-7 shadow-[inset_0_1px_0_rgb(255_255_255/0.12)] sm:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 -z-10 size-72 rounded-full border border-white/10 [box-shadow:0_0_0_32px_rgb(255_255_255/0.02),0_0_0_70px_rgb(255_255_255/0.012)]"
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-display text-sm font-light uppercase italic tracking-[0.32em] text-mute">Seu combo</p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/25 px-3 py-1 text-xs font-semibold text-brand-200 ring-1 ring-brand-400/40">
                <Tag weight="bold" className="size-3.5" aria-hidden />
                {COMBO_DISCOUNT_LABEL}
              </span>
            </div>

            <h3 className="mt-5 min-h-[2.2em] font-display text-[clamp(1.9rem,3.4vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-ink">
              <Swap id={key}>
                {pkg.name} <span className="text-violet pr-[0.06em] font-light italic">+</span> {site.name}
              </Swap>
            </h3>

            <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
              <div className="flex flex-col gap-2 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <dt>
                  <span className="block text-sm text-mute">Pacote mensal</span>
                  <Swap id={pkg.slug} className="mt-0.5 font-display text-xl font-semibold text-ink">
                    Prospecta {pkg.name}
                  </Swap>
                </dt>
                <dd className="sm:text-right">
                  <Swap id={pkg.slug} className="font-display text-xl font-semibold text-ink">
                    {formatPrice(pkg.priceMin, pkg.priceMax)}
                    <span className="text-base font-normal text-mute">/mês</span>
                  </Swap>
                  <span className="mt-0.5 block text-sm text-mute">mesmo valor do pacote</span>
                </dd>
              </div>

              <div className="flex flex-col gap-2 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <dt>
                  <span className="block text-sm text-mute">Site, projeto único</span>
                  <Swap id={site.slug} className="mt-0.5 font-display text-xl font-semibold text-ink">
                    {site.name}
                  </Swap>
                </dt>
                <dd className="sm:text-right">
                  <Swap id={site.slug}>
                    <span className="block text-sm text-mute">
                      Separado <s className="decoration-brand-300/70">{formatPrice(site.priceMin, site.priceMax)}</s>
                    </span>
                    <span className="mt-0.5 block font-display text-xl font-semibold text-ink">
                      <span className="mr-2 text-sm font-medium text-brand-200">No combo</span>
                      {formatPrice(siteMin, siteMax)}
                    </span>
                  </Swap>
                </dd>
              </div>
            </dl>
          </div>

          <div className="ticket-bottom relative overflow-hidden rounded-b-3xl bg-[linear-gradient(160deg,#6c39d2_0%,#4a1aa6_50%,#2e0d78_100%)] p-7 text-white shadow-[inset_0_-1px_0_rgb(255_255_255/0.12)] sm:p-10">
            <span aria-hidden className="absolute inset-x-7 top-0 border-t-2 border-dashed border-white/30 sm:inset-x-10" />
            <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
              <p aria-live="polite">
                <span className="block text-white/80">No combo, você economiza no site</span>
                <Swap id={site.slug} className="mt-1 font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-none tracking-[-0.03em]">
                  {saving}
                </Swap>
              </p>
              <WhatsAppButton
                variant="light"
                className="w-full sm:w-auto"
                message={`Olá, Prospecta! Vim pelo site e gostaria de agendar um orçamento do combo Prospecta ${pkg.name} + ${site.name}.`}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
