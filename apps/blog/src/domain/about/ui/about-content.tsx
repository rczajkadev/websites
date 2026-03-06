import type { AboutInfo } from '../models';

type AboutContentProps = {
  aboutInfo: AboutInfo;
};

export function AboutContent({ aboutInfo }: AboutContentProps) {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl sm:text-4xl">{aboutInfo.title}</h1>
      {aboutInfo.paragraphs.map((paragraph, index) => (
        <p key={`${paragraph}-${index}`} className="leading-relaxed sm:text-lg">
          {paragraph}
        </p>
      ))}
    </section>
  );
}
