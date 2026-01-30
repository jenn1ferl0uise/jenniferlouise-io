type HubLinkProps = {
  title: string;
  description?: string;
  href: string;
};

function HubLink({ title, description, href }: HubLinkProps) {
  return (
    <a
      href={href}
      aria-label={`Visit ${title}`}
      className="
        block rounded-xl border border-neutral-200
        p-5 transition
        hover:border-neutral-400
        hover:bg-neutral-50
      "
    >
      <div className="space-y-1">
        <h2 className="text-lg font-medium">{title}</h2>
        {description && <p className="text-sm opacity-70">{description}</p>}
      </div>
    </a>
  );
}

export default HubLink;
