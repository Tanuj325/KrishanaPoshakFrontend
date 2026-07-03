import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FiEdit3,
  FiKey,
  FiLogOut,
  FiMail,
  FiPhone,
  FiUser,
} from 'react-icons/fi'
import AccountNav from '../../components/account/AccountNav'
import ChangePasswordPanel from '../../components/account/ChangePasswordPanel'
import EditProfilePanel from '../../components/account/EditProfilePanel'
import SavedAddressesPreview from '../../components/account/SavedAddressesPreview'
import { useAuth } from '../../hooks/useAuth'
import { useAddresses } from '../../hooks/useAddresses'

function Profile() {
  const navigate = useNavigate()
  const { currentUser, logout, updateProfile, changePassword } = useAuth()
  const { addresses } = useAddresses(currentUser?.id)
  const [activePanel, setActivePanel] = useState(null)

  const fullName = `${currentUser?.firstName || ''} ${currentUser?.lastName || ''}`.trim()
  const initials = `${currentUser?.firstName?.[0] || ''}${currentUser?.lastName?.[0] || ''}`

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  if (!currentUser) {
    return null
  }

  return (
    <section className="section-padding">
      <div className="app-container">
        <div className="max-w-3xl">
          <span className="eyebrow">My Account</span>
          <h1 className="mt-3 text-4xl font-extrabold text-ink sm:text-5xl">Profile</h1>
          <p className="mt-3 text-muted">
            Manage your personal details, security settings, and saved addresses.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[16rem_1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <AccountNav />
          </div>

          <div className="grid gap-6">
            <section className="overflow-hidden rounded-[1.25rem] border border-border bg-secondary shadow-premium">
              <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-transparent px-5 py-6 sm:px-8 sm:py-8">
                <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
                  {currentUser.profilePicture ? (
                    <img
                      src={currentUser.profilePicture}
                      alt={fullName}
                      className="size-24 shrink-0 rounded-full border-4 border-secondary object-cover shadow-premium sm:size-28"
                    />
                  ) : (
                    <span className="grid size-24 shrink-0 place-items-center rounded-full border-4 border-secondary bg-primary/15 text-3xl font-extrabold text-primary shadow-premium sm:size-28">
                      {initials}
                    </span>
                  )}

                  <div className="text-center sm:text-left">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                      Profile Picture
                    </p>
                    <h2 className="mt-2 text-2xl font-extrabold text-ink sm:text-3xl">
                      {fullName}
                    </h2>
                    <p className="mt-2 text-sm text-muted">
                      Member since your devotional journey with us
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-8">
                <InfoTile icon={FiUser} label="Full Name" value={fullName} />
                <InfoTile icon={FiMail} label="Email" value={currentUser.email} />
                <InfoTile
                  icon={FiPhone}
                  label="Phone Number"
                  value={currentUser.phone || 'Not added yet'}
                  className="sm:col-span-2"
                />
              </div>

              <div className="flex flex-col gap-3 border-t border-border px-5 py-5 sm:flex-row sm:px-8">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    setActivePanel((panel) => (panel === 'edit' ? null : 'edit'))
                  }
                >
                  <FiEdit3 className="size-4" />
                  Edit Profile
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() =>
                    setActivePanel((panel) =>
                      panel === 'password' ? null : 'password',
                    )
                  }
                >
                  <FiKey className="size-4" />
                  Change Password
                </button>
              </div>
            </section>

            {activePanel === 'edit' ? (
              <EditProfilePanel
                user={currentUser}
                onSave={updateProfile}
                onCancel={() => setActivePanel(null)}
              />
            ) : null}

            {activePanel === 'password' ? (
              <ChangePasswordPanel
                onSave={changePassword}
                onCancel={() => setActivePanel(null)}
              />
            ) : null}

            <SavedAddressesPreview addresses={addresses} />

            <section className="rounded-[1.25rem] border border-red-200 bg-red-50 p-5 sm:p-6">
              <h2 className="text-lg font-extrabold text-ink">Logout</h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                Sign out of your account on this device. Your cart and saved details
                will remain secure.
              </p>
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-secondary mt-5 border-red-200 text-red-600 hover:border-red-300 hover:bg-red-100"
              >
                <FiLogOut className="size-4" />
                Logout
              </button>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoTile({ icon: Icon, label, value, className = '' }) {
  return (
    <div
      className={`rounded-card border border-border bg-background p-4 ${className}`}
    >
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-muted">
        <Icon className="size-3.5 text-primary" />
        {label}
      </div>
      <p className="mt-2 text-base font-semibold text-ink">{value}</p>
    </div>
  )
}

export default Profile
