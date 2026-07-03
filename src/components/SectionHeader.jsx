function SectionHeader({ eyebrow, title, description, align = 'center' }) {
  const alignment =
    align === 'left' ? 'items-start text-left' : 'items-center text-center'

  return (
    <div className={`mx-auto flex max-w-3xl flex-col gap-3 ${alignment}`}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="heading-section text-balance">{title}</h2>
      {description ? (
        <p className="body-large max-w-2xl text-pretty">{description}</p>
      ) : null}
    </div>
  )
}

export default SectionHeader
