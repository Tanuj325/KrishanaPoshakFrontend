import { useState } from 'react'
import { FiMapPin, FiPlus } from 'react-icons/fi'
import AccountNav from '../../components/account/AccountNav'
import AddressCard from '../../components/account/AddressCard'
import AddressForm from '../../components/account/AddressForm'
import AuthAlert from '../../components/auth/AuthAlert'
import { useAddresses } from '../../hooks/useAddresses'
import { useAuth } from '../../hooks/useAuth'

function SavedAddresses() {
  const { currentUser } = useAuth()
  const {
    addresses,
    isLoading,
    error,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  } = useAddresses(currentUser?.id)

  const [editingAddress, setEditingAddress] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const openCreateForm = () => {
    setEditingAddress(null)
    setFormError('')
    setIsFormOpen(true)
  }

  const openEditForm = (address) => {
    setEditingAddress(address)
    setFormError('')
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingAddress(null)
    setFormError('')
  }

  const handleSubmit = async (values) => {
    setFormError('')
    setIsSubmitting(true)

    try {
      if (editingAddress) {
        await updateAddress(editingAddress.id, values)
      } else {
        await addAddress(values)
      }
      closeForm()
    } catch (err) {
      setFormError(err.message || 'Unable to save address')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (addressId) => {
    const confirmed = window.confirm('Delete this address permanently?')
    if (!confirmed) return

    setDeletingId(addressId)

    try {
      await deleteAddress(addressId)
      if (editingAddress?.id === addressId) {
        closeForm()
      }
    } catch (err) {
      setFormError(err.message || 'Unable to delete address')
    } finally {
      setDeletingId(null)
    }
  }

  const handleSetDefault = async (addressId) => {
    try {
      await setDefaultAddress(addressId)
    } catch (err) {
      setFormError(err.message || 'Unable to set default address')
    }
  }

  return (
    <section className="section-padding">
      <div className="app-container">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <span className="eyebrow">Delivery Details</span>
            <h1 className="mt-3 text-4xl font-extrabold text-ink sm:text-5xl">
              Saved Addresses
            </h1>
            <p className="mt-3 text-muted">
              Add, edit, and manage delivery addresses for faster checkout.
            </p>
          </div>
          <button type="button" className="btn btn-primary w-fit" onClick={openCreateForm}>
            <FiPlus className="size-5" />
            Add Address
          </button>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[16rem_1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <AccountNav />
          </div>

          <div className="grid gap-6">
            <AuthAlert message={error} />

            {isFormOpen ? (
              <section className="rounded-[1.25rem] border border-border bg-secondary p-5 shadow-premium sm:p-6">
                <h2 className="text-xl font-extrabold text-ink">
                  {editingAddress ? 'Edit Address' : 'Add New Address'}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {editingAddress
                    ? 'Update your saved delivery details.'
                    : 'Save a new address for orders and gifting.'}
                </p>
                <div className="mt-6">
                  <AddressForm
                    address={editingAddress}
                    onSubmit={handleSubmit}
                    onCancel={closeForm}
                    isSubmitting={isSubmitting}
                    formError={formError}
                  />
                </div>
              </section>
            ) : null}

            {isLoading ? (
              <div className="rounded-[1.25rem] border border-border bg-secondary p-8 text-center shadow-premium">
                <p className="text-sm font-semibold text-muted">Loading addresses...</p>
              </div>
            ) : addresses.length === 0 ? (
              <div className="rounded-[1.25rem] border border-border bg-secondary p-8 text-center shadow-premium sm:p-12">
                <span className="mx-auto grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
                  <FiMapPin className="size-7" />
                </span>
                <h2 className="mt-6 text-2xl font-extrabold text-ink">
                  No saved addresses
                </h2>
                <p className="mx-auto mt-3 max-w-md text-muted">
                  Add your home, mandir, or gifting addresses to speed up checkout.
                </p>
                <button type="button" className="btn btn-primary btn-lg mt-8" onClick={openCreateForm}>
                  <FiPlus className="size-5" />
                  Add New Address
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {addresses.map((address) => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    onEdit={openEditForm}
                    onDelete={handleDelete}
                    onSetDefault={handleSetDefault}
                    isDeleting={deletingId === address.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SavedAddresses
