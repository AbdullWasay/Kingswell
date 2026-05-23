export interface CoverageArea {
  name: string;
  blurb: string;
}

export interface CoverageAreasContent {
  title: string;
  intro: string;
  disclaimer: string;
  areas: CoverageArea[];
}

export default function AreasWeCover({ content }: { content: CoverageAreasContent }) {
  return (
    <section id="areas-we-cover" className="bg-[#faf9f7] section-padding scroll-mt-24">
      <div className="mx-auto max-w-4xl text-center">
        <div className="gold-divider mb-6" />
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-kingswell-gold">
          Local expertise · Wider reach
        </p>
        <h2 className="font-serif text-3xl text-kingswell-green md:text-5xl">
          {content.title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
          {content.intro}
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-5xl space-y-0 divide-y divide-kingswell-gold/20 border-y border-kingswell-gold/20">
        {content.areas.map((area, index) => (
          <article
            key={area.name}
            className={`grid gap-6 py-10 md:grid-cols-12 md:items-start md:gap-10 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="md:col-span-4">
              <span className="font-serif text-4xl text-kingswell-gold/40 md:text-5xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-serif text-2xl text-kingswell-green md:text-3xl">
                {area.name}
              </h3>
            </div>
            <div className="md:col-span-8 md:border-l md:border-kingswell-gold/25 md:pl-10">
              <p className="text-base leading-relaxed text-gray-600 md:text-lg">
                {area.blurb}
              </p>
            </div>
          </article>
        ))}
      </div>

      <p className="mx-auto mt-14 max-w-2xl text-center text-sm italic leading-relaxed text-gray-500">
        {content.disclaimer}
      </p>
    </section>
  );
}
