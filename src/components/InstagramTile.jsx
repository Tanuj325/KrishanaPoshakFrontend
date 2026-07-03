import { FiInstagram } from 'react-icons/fi'

function InstagramTile({ image, index }) {
  return (
    <a
      href="https://www.instagram.com/"
      target="_blank"
      rel="noreferrer"
      className="group relative aspect-square overflow-hidden rounded-card bg-ink"
      aria-label={`View Instagram post ${index + 1}`}
    >
      <img
        src={image}
        alt=""
        className="size-full object-cover transition duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <span className="absolute inset-0 grid place-items-center bg-ink/0 text-secondary opacity-0 transition duration-300 group-hover:bg-ink/45 group-hover:opacity-100">
        <FiInstagram className="size-7" />
      </span>
    </a>
  )
}

export default InstagramTile
