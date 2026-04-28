import { Tags } from '@/domain/posts/components';

type TaxonomyAsideProps = {
  title: string;
  description?: string;
  relatedTags?: string[];
};

export function TaxonomyAside({ title, description, relatedTags }: TaxonomyAsideProps) {
  return (
    <section className="space-y-8 md:sticky md:top-20">
      <div className="space-y-4">
        <h1 className="text-2xl sm:text-3xl">{title}</h1>
        {!!description && <p className="text-base leading-relaxed">{description}</p>}
      </div>
      {!!relatedTags?.length && <Tags tags={relatedTags} />}
    </section>
  );
}
