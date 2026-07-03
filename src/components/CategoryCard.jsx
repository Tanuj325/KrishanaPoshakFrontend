import { FiArrowUpRight } from 'react-icons/fi'

function CategoryCard({ category }) {
  return (
    <article className="group relative isolate min-h-72 overflow-hidden rounded-card bg-ink shadow-premium">
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 -z-10 size-full object-cover transition duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/38 to-transparent" />
      <div className="flex h-full min-h-72 flex-col justify-end p-5 sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
          {category.count}
        </p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <h3 className="max-w-52 text-2xl font-bold text-secondary">
            {category.name}
          </h3>
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-secondary text-ink transition duration-200 group-hover:-translate-y-1 group-hover:bg-primary group-hover:text-secondary">
            <FiArrowUpRight className="size-5" />
          </span>
        </div>
      </div>
    </article>
  )
}

export default CategoryCard
