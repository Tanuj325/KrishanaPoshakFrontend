function FeatureCard({ feature }) {
  const Icon = feature.icon

  return (
    <article className="card-soft p-6 transition duration-200 hover:-translate-y-1 hover:border-accent/60">
      <span className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <h3 className="mt-5 text-lg font-bold text-ink">{feature.title}</h3>
      <p className="mt-2 text-sm leading-7 text-muted">{feature.description}</p>
    </article>
  )
}

export default FeatureCard
