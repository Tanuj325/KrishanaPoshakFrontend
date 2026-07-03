import { FiStar } from 'react-icons/fi'

function ReviewCard({ review }) {
  return (
    <article className="card-soft p-6">
      <div className="flex items-center gap-1 text-accent">
        {Array.from({ length: 5 }).map((_, index) => (
          <FiStar key={index} className="size-4 fill-accent" />
        ))}
      </div>
      <p className="mt-5 text-base leading-8 text-ink">"{review.quote}"</p>
      <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-5">
        <div>
          <h3 className="text-base font-bold text-ink">{review.name}</h3>
          <p className="text-sm text-muted">{review.location}</p>
        </div>
        <span className="rounded-full bg-accent/14 px-3 py-1 text-sm font-bold text-ink">
          {review.rating}
        </span>
      </div>
    </article>
  )
}

export default ReviewCard
