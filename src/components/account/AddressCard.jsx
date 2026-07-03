import { FiEdit3, FiMapPin, FiStar, FiTrash2 } from 'react-icons/fi'
import { formatAddress } from '../../utils/addressStorage'

function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
  isDeleting = false,
}) {
  return (
    <article
      className={`rounded-[1.25rem] border bg-secondary p-5 shadow-[0_14px_34px_rgb(36_22_10_/_0.07)] ${
        address.isDefault ? 'border-primary' : 'border-border'
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
            <FiMapPin className="size-5" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-extrabold text-ink">{address.label}</h3>
              {address.isDefault ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                  <FiStar className="size-3" />
                  Default
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-sm font-semibold text-ink">{address.name}</p>
            <p className="mt-1 text-sm leading-6 text-muted">{formatAddress(address)}</p>
            <p className="mt-2 text-sm text-muted">{address.phone}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:justify-end">
          {!address.isDefault ? (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => onSetDefault(address.id)}
            >
              <FiStar className="size-4" />
              Set Default
            </button>
          ) : null}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onEdit(address)}
          >
            <FiEdit3 className="size-4" />
            Edit
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50"
            onClick={() => onDelete(address.id)}
            disabled={isDeleting}
          >
            <FiTrash2 className="size-4" />
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}

export default AddressCard
