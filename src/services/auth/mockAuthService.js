const USERS_KEY = 'krishana-poshak-users'
const RESET_TOKENS_KEY = 'krishana-poshak-reset-tokens'

const DEMO_USER = {
  id: 1,
  firstName: 'Radha',
  lastName: 'Sharma',
  email: 'radha@example.com',
  phone: '+91 98765 43210',
  profilePicture: '',
  password: 'Password1',
}

function toPublicUser(user) {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone || '',
    profilePicture: user.profilePicture || '',
  }
}

function delay(ms = 600) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function loadUsers() {
  try {
    const stored = localStorage.getItem(USERS_KEY)
    const users = stored ? JSON.parse(stored) : []
    const hasDemo = users.some((user) => user.email === DEMO_USER.email)

    if (!hasDemo) {
      const seeded = [...users, { ...DEMO_USER }]
      localStorage.setItem(USERS_KEY, JSON.stringify(seeded))
      return seeded
    }

    return users
  } catch {
    return [{ ...DEMO_USER }]
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function createToken(payload, expiresInSeconds = 3600) {
  const tokenPayload = {
    ...payload,
    exp: Date.now() + expiresInSeconds * 1000,
    iat: Date.now(),
  }

  return `dummy.${btoa(JSON.stringify(tokenPayload))}.jwt`
}

function parseToken(token) {
  try {
    const encoded = token.split('.')[1]
    return JSON.parse(atob(encoded))
  } catch {
    return null
  }
}

function buildAuthResponse(user, rememberMe = true) {
  const safeUser = toPublicUser(user)

  return {
    accessToken: createToken({ sub: user.id, email: user.email, type: 'access' }),
    refreshToken: createToken(
      { sub: user.id, email: user.email, type: 'refresh' },
      rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 8,
    ),
    tokenType: 'Bearer',
    expiresIn: 3600,
    user: safeUser,
  }
}

function loadResetTokens() {
  try {
    return JSON.parse(localStorage.getItem(RESET_TOKENS_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveResetTokens(tokens) {
  localStorage.setItem(RESET_TOKENS_KEY, JSON.stringify(tokens))
}

export async function mockLogin({ email, password, rememberMe = true }) {
  await delay()
  const users = loadUsers()
  const user = users.find(
    (item) => item.email.toLowerCase() === email.trim().toLowerCase(),
  )

  if (!user || user.password !== password) {
    throw new Error('Invalid email or password')
  }

  return buildAuthResponse(user, rememberMe)
}

export async function mockRegister({ firstName, lastName, email, password }) {
  await delay()
  const users = loadUsers()
  const normalizedEmail = email.trim().toLowerCase()

  if (users.some((item) => item.email.toLowerCase() === normalizedEmail)) {
    throw new Error('An account with this email already exists')
  }

  const newUser = {
    id: Date.now(),
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: normalizedEmail,
    password,
  }

  saveUsers([...users, newUser])
  return buildAuthResponse(newUser, true)
}

export async function mockLogout() {
  await delay(200)
}

export async function mockGetCurrentUser(accessToken) {
  await delay(300)
  const payload = parseToken(accessToken)

  if (!payload || payload.exp < Date.now()) {
    throw new Error('Session expired')
  }

  const users = loadUsers()
  const user = users.find((item) => item.id === payload.sub)

  if (!user) {
    throw new Error('User not found')
  }

  return toPublicUser(user)
}

export async function mockUpdateProfile(userId, payload) {
  await delay()
  const users = loadUsers()
  const normalizedEmail = payload.email?.trim().toLowerCase()

  if (
    normalizedEmail &&
    users.some(
      (item) => item.id !== userId && item.email.toLowerCase() === normalizedEmail,
    )
  ) {
    throw new Error('An account with this email already exists')
  }

  const nextUsers = users.map((user) =>
    user.id === userId
      ? {
          ...user,
          firstName: payload.firstName?.trim() ?? user.firstName,
          lastName: payload.lastName?.trim() ?? user.lastName,
          email: normalizedEmail ?? user.email,
          phone: payload.phone?.trim() ?? user.phone ?? '',
          profilePicture: payload.profilePicture ?? user.profilePicture ?? '',
        }
      : user,
  )

  saveUsers(nextUsers)
  const updatedUser = nextUsers.find((user) => user.id === userId)

  if (!updatedUser) {
    throw new Error('User not found')
  }

  return toPublicUser(updatedUser)
}

export async function mockChangePassword(userId, { currentPassword, newPassword }) {
  await delay()
  const users = loadUsers()
  const user = users.find((item) => item.id === userId)

  if (!user || user.password !== currentPassword) {
    throw new Error('Current password is incorrect')
  }

  const nextUsers = users.map((item) =>
    item.id === userId ? { ...item, password: newPassword } : item,
  )
  saveUsers(nextUsers)

  return { message: 'Password updated successfully' }
}

export async function mockRefreshToken(refreshToken) {
  await delay(300)
  const payload = parseToken(refreshToken)

  if (!payload || payload.type !== 'refresh' || payload.exp < Date.now()) {
    throw new Error('Invalid refresh token')
  }

  const users = loadUsers()
  const user = users.find((item) => item.id === payload.sub)

  if (!user) {
    throw new Error('User not found')
  }

  return buildAuthResponse(user, true)
}

export async function mockForgotPassword({ email }) {
  await delay()
  const users = loadUsers()
  const normalizedEmail = email.trim().toLowerCase()
  const user = users.find((item) => item.email.toLowerCase() === normalizedEmail)

  if (!user) {
    return {
      message:
        'If an account exists for this email, password reset instructions have been sent.',
    }
  }

  const token = createToken(
    { sub: user.id, email: user.email, type: 'reset' },
    60 * 15,
  )
  const tokens = loadResetTokens()
  tokens[token] = { userId: user.id, email: user.email, exp: Date.now() + 15 * 60 * 1000 }
  saveResetTokens(tokens)

  return {
    message:
      'If an account exists for this email, password reset instructions have been sent.',
    resetToken: token,
  }
}

export async function mockResetPassword({ token, password }) {
  await delay()
  const tokens = loadResetTokens()
  const resetEntry = tokens[token]
  const payload = parseToken(token)

  if (
    !resetEntry ||
    !payload ||
    payload.type !== 'reset' ||
    resetEntry.exp < Date.now()
  ) {
    throw new Error('This reset link is invalid or has expired')
  }

  const users = loadUsers()
  const nextUsers = users.map((user) =>
    user.id === resetEntry.userId ? { ...user, password } : user,
  )
  saveUsers(nextUsers)

  delete tokens[token]
  saveResetTokens(tokens)

  return {
    message: 'Your password has been reset successfully. You can now sign in.',
  }
}
