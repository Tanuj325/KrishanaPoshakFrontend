import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { appendOrder } from '../utils/orderStorage'

import {
  FiCheckCircle,
  FiCreditCard,
  FiLock,
  FiMapPin,
  FiShoppingBag,
  FiTruck,
  FiUser,
} from 'react-icons/fi'
import { useAppContext } from '../hooks/useAppContext'

const formatPrice = (amount) => `Rs. ${amount.toLocaleString('en-IN')}`

const initialFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pinCode: '',
  country: 'India',
  orderNotes: '',
  paymentMethod: 'cod',
}

function Checkout() {
  const navigate = useNavigate()
  const { cartItems, cartSubtotal, cartTotalItems, clearCart } = useAppContext()


  const [form, setForm] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)




  // Upgrade: “Select Address” with fallback to manual inputs.
  // No saved-address integration yet; we keep a polished UI + manual fallback.
  const [addressMode, setAddressMode] = useState('saved') // 'saved' | 'manual'
  const [selectedAddressId, setSelectedAddressId] = useState('addr_default')
  const savedAddresses = [
    {
      id: 'addr_default',
      label: 'Default Address',
      firstName: 'Radha',
      lastName: 'Sharma',
      phone: '+91 98765 43210',
      address: 'House 12, Govind Nagar, Vrindavan',
      city: 'Vrindavan',
      state: 'Uttar Pradesh',
      pinCode: '281121',
      country: 'India',
    },
  ]

  const activeAddress =
    addressMode === 'saved'
      ? savedAddresses.find((a) => a.id === selectedAddressId)
      : null

  const shipping = cartSubtotal === 0 || cartSubtotal >= 2000 ? 0 : 99
  const taxes = Math.round(cartSubtotal * 0.05) // placeholder 5% tax
  // Coupon placeholder: no backend. We only demonstrate a disabled/placeholder flow.
  const couponDiscount = 0 // kept 0 for now
  const total = cartSubtotal + shipping + taxes - couponDiscount



  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const validate = () => {
    const nextErrors = {}

    // If user is selecting a saved address, require saved address selection.
    // (No backend saved-address integration yet.)
    if (addressMode === 'saved') {
      if (!activeAddress) {
        nextErrors.addressMode = 'Select an address'
      }
    }

    const required = [
      'firstName',
      'lastName',
      'email',
      'phone',
    ]

    if (addressMode === 'manual') {
      required.push('address', 'city', 'state', 'pinCode', 'country')
    }


    required.forEach((field) => {
      if (!form[field].trim()) {
        nextErrors[field] = 'This field is required'
      }
    })

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Enter a valid email address'
    }

    if (form.phone && !/^[\d\s+\-()]{10,}$/.test(form.phone.trim())) {
      nextErrors.phone = 'Enter a valid phone number'
    }

    if (form.pinCode && !/^\d{6}$/.test(form.pinCode.trim())) {
      nextErrors.pinCode = 'Enter a valid 6-digit PIN code'
    }




    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    // If user selected saved address, prefill the manual fields used in confirmation.
    if (addressMode === 'saved' && activeAddress) {
      setForm((prev) => ({
        ...prev,
        firstName: activeAddress.firstName,
        lastName: activeAddress.lastName,
        phone: activeAddress.phone,
        address: activeAddress.address,
        city: activeAddress.city,
        state: activeAddress.state,
        pinCode: activeAddress.pinCode,
        country: activeAddress.country,
      }))
    }

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Persist order to LocalStorage (no backend).
    const chosenAddress =
      addressMode === 'saved' && activeAddress
        ? activeAddress
        : {
            firstName: form.firstName,
            lastName: form.lastName,
            phone: form.phone,
            address: form.address,
            city: form.city,
            state: form.state,
            pinCode: form.pinCode,
            country: form.country,
          }

    appendOrder({
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      paymentMethod: form.paymentMethod,
      paymentStatus: 'Unpaid',
      status: 'Pending',
      products: cartItems.map((it) => ({
        productId: it.product.id ?? null,
        name: it.product.name,
        quantity: it.quantity,
        lineTotal: it.product.priceValue * it.quantity,
        image: it.product.image,
        selectedSize: it.selectedSize,
        priceValue: it.product.priceValue,
      })),
      totals: {
        subtotalAmount: cartSubtotal,
        shippingAmount: shipping,
        taxesAmount: taxes,
        couponDiscountAmount: couponDiscount,
        totalAmount: total,
      },
      deliveryAddress: chosenAddress,
    })

    clearCart()
    setOrderPlaced(true)
    setIsSubmitting(false)
  }



  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <section className="section-padding">
        <div className="app-container">
          <div className="mx-auto max-w-2xl rounded-[1.25rem] border border-border bg-secondary p-8 text-center shadow-premium">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
              <FiShoppingBag className="size-7" />
            </span>
            <h1 className="mt-6 text-3xl font-extrabold text-ink">
              Your cart is empty
            </h1>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Add products to your cart before starting checkout.
            </p>
            <NavLink to="/shop" className="btn btn-primary btn-lg mt-8">
              Continue Shopping
            </NavLink>
          </div>
        </div>
      </section>
    )
  }

  if (orderPlaced) {
    return (
      <section className="section-padding">
        <div className="app-container">
          <div className="mx-auto max-w-2xl rounded-[1.25rem] border border-border bg-secondary p-8 text-center shadow-premium sm:p-10">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-green-100 text-green-600">
              <FiCheckCircle className="size-8" />
            </span>
            <h1 className="mt-6 text-3xl font-extrabold text-ink">
              Order placed successfully
            </h1>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Thank you, {form.firstName}! We have received your order.
              Payment: {form.paymentMethod.toUpperCase()}.
              <br />
              {addressMode === 'saved'
                ? `Delivery: ${activeAddress?.label || 'Default Address'}`
                : 'Delivery address entered.'}
            </p>


            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/shop')}
              >
                Continue Shopping
              </button>
              <NavLink to="/" className="btn btn-secondary btn-lg">
                Back to Home
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding">
      <div className="app-container">
        <div className="max-w-3xl">
          <span className="eyebrow">Secure Checkout</span>
          <h1 className="mt-3 text-4xl font-extrabold text-ink sm:text-5xl">
            Complete your order
          </h1>
          <p className="mt-3 text-muted">
            Enter your shipping and payment details to place your order.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-10 grid gap-6 lg:grid-cols-[1fr_24rem] lg:items-start lg:gap-8"
        >
          <CheckoutPanel
            className="order-1"
            icon={FiMapPin}
            title="Select Address"
            description="Choose a saved delivery address or enter a new one."
          >

            <div className="grid gap-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm font-semibold text-ink">Address mode</span>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setAddressMode('saved')}
                    className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                      addressMode === 'saved'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-background text-ink hover:border-accent'
                    }`}
                  >
                    Saved
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddressMode('manual')}
                    className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                      addressMode === 'manual'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-background text-ink hover:border-accent'
                    }`}
                  >
                    Enter New
                  </button>
                </div>
              </div>

              {addressMode === 'saved' ? (
                <div className="grid gap-3">
                  <div className="rounded-[1rem] border border-border bg-background p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-extrabold text-ink">
                          {activeAddress?.label || 'Select an address'}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-muted">
                          {activeAddress?.firstName} {activeAddress?.lastName} · {activeAddress?.phone}
                        </p>
                      </div>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary">
                        Deliver here
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-ink">
                      {activeAddress?.address}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {activeAddress?.city}, {activeAddress?.state} - {activeAddress?.pinCode}, {activeAddress?.country}
                    </p>
                  </div>

                  <div className="grid gap-2">
                    {savedAddresses.map((addr) => (
                      <label
                        key={addr.id}
                        className={`flex cursor-pointer items-start justify-between gap-3 rounded-card border p-4 transition ${
                          selectedAddressId === addr.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border bg-background hover:border-accent'
                        }`}
                      >
                        <span className="min-w-0">
                          <span className="block text-sm font-extrabold text-ink">
                            {addr.label}
                          </span>
                          <span className="mt-1 block truncate text-xs font-semibold text-muted">
                            {addr.address}
                          </span>
                        </span>
                        <input
                          type="radio"
                          name="selectedAddress"
                          checked={selectedAddressId === addr.id}
                          onChange={() => setSelectedAddressId(addr.id)}
                          className="mt-1 size-4 accent-primary"
                        />
                      </label>
                    ))}
                  </div>

                  {errors.addressMode ? (
                    <p className="text-xs font-semibold text-red-500">{errors.addressMode}</p>
                  ) : null}
                </div>
              ) : (
                <div className="grid gap-4">
                  <FormField
                    label="Address"
                    placeholder="House number, street, area"
                    value={form.address}
                    onChange={(value) => updateField('address', value)}
                    error={errors.address}
                    required
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      label="City"
                      placeholder="Vrindavan"
                      value={form.city}
                      onChange={(value) => updateField('city', value)}
                      error={errors.city}
                      required
                    />
                    <FormField
                      label="State"
                      placeholder="Uttar Pradesh"
                      value={form.state}
                      onChange={(value) => updateField('state', value)}
                      error={errors.state}
                      required
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      label="PIN Code"
                      placeholder="281121"
                      value={form.pinCode}
                      onChange={(value) => updateField('pinCode', value)}
                      error={errors.pinCode}
                      required
                    />
                    <FormField
                      label="Country"
                      placeholder="India"
                      value={form.country}
                      onChange={(value) => updateField('country', value)}
                      error={errors.country}
                      required
                    />
                  </div>
                </div>
              )}

              <label className="grid gap-2">
                <span className="text-sm font-bold text-ink">Order Notes</span>
                <textarea
                  rows="4"
                  placeholder="Any delivery notes or special instructions"
                  value={form.orderNotes}
                  onChange={(event) => updateField('orderNotes', event.target.value)}
                  className="w-full resize-none rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium text-ink outline-none transition placeholder:text-muted/70 focus:border-primary focus:bg-secondary focus:ring-4 focus:ring-primary/10"
                />
              </label>
            </div>
          </CheckoutPanel>


          <CheckoutPanel
            className="order-2"
            icon={FiUser}
            title="Customer Information"
            description="We will use this information to contact you about your order."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="First Name"
                placeholder="Radha"
                value={form.firstName}
                onChange={(value) => updateField('firstName', value)}
                error={errors.firstName}
                required
              />
              <FormField
                label="Last Name"
                placeholder="Sharma"
                value={form.lastName}
                onChange={(value) => updateField('lastName', value)}
                error={errors.lastName}
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Email Address"
                type="email"
                placeholder="radha@example.com"
                value={form.email}
                onChange={(value) => updateField('email', value)}
                error={errors.email}
                required
              />
              <FormField
                label="Phone Number"
                type="tel"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(value) => updateField('phone', value)}
                error={errors.phone}
                required
              />
            </div>
          </CheckoutPanel>

          <OrderSummary
            className="order-3 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-3"
            cartItems={cartItems}
            cartTotalItems={cartTotalItems}
            cartSubtotal={cartSubtotal}
            shipping={shipping}
            taxes={taxes}
            couponDiscount={couponDiscount}
            total={total}
          />


          <CheckoutPanel
            className="order-4 lg:col-start-1"
            icon={FiCreditCard}
            title="Payment Method"
            description="Choose how you would like to pay for this order."
          >
            <div className="grid gap-3">
              <PaymentOption
                value="cod"
                title="Cash on Delivery"
                description="Pay when your order arrives."
                checked={form.paymentMethod === 'cod'}
                onChange={(value) => updateField('paymentMethod', value)}
              />
              <PaymentOption
                value="upi"
                title="UPI / Bank Transfer"
                description="Our team will share payment details after order confirmation."
                checked={form.paymentMethod === 'upi'}
                onChange={(value) => updateField('paymentMethod', value)}
              />
              <PaymentOption
                value="card"
                title="Credit / Debit Card"
                description="Card payment integration can be connected later."
                checked={form.paymentMethod === 'card'}
                onChange={(value) => updateField('paymentMethod', value)}
              />
            </div>
          </CheckoutPanel>

          <div className="order-5 lg:col-start-1">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-lg w-full disabled:cursor-not-allowed disabled:opacity-70"
            >
              <FiLock className="size-5" />
              {isSubmitting ? 'Placing Order...' : 'Place Order'}
            </button>
            <p className="mt-3 text-center text-xs leading-6 text-muted">
              Your personal data is used only to process your order.
            </p>
            <p className="mt-1 text-center text-xs leading-6 text-muted">
              Note: Payment integration is not connected yet.
            </p>

          </div>
        </form>
      </div>
    </section>
  )
}

function OrderSummary({
  className = '',
  cartItems,
  cartTotalItems,
  cartSubtotal,
  shipping,
  taxes,
  couponDiscount,
  total,
}) {
  // couponCode intentionally not wired to backend yet

  return (
    <aside

      className={`rounded-[1.25rem] border border-border bg-secondary p-5 shadow-premium sm:p-6 lg:sticky lg:top-28 ${className}`}
    >
      <h2 className="text-2xl font-extrabold text-ink">Order Summary</h2>
      <p className="mt-1 text-sm text-muted">
        {cartTotalItems} item{cartTotalItems === 1 ? '' : 's'} in your cart
      </p>

      <div className="mt-6 grid gap-4">
        {cartItems.map((item) => (
          <div
            key={item.cartId}
            className="grid grid-cols-[4rem_1fr] gap-3 border-b border-border pb-4 last:border-b-0 last:pb-0"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="aspect-square rounded-card object-cover"
            />
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-extrabold leading-5 text-ink">
                    {item.product.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-muted">
                    Size: {item.selectedSize} | Qty: {item.quantity}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-extrabold text-primary">
                  {formatPrice(item.product.priceValue * item.quantity)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4 border-y border-border py-5">
        <SummaryRow label="Subtotal" value={formatPrice(cartSubtotal)} />

        <SummaryRow
          label="Shipping Charges"
          value={shipping === 0 ? 'Free' : formatPrice(shipping)}
        />

        <SummaryRow label="Taxes" value={formatPrice(taxes)} />

        <div className="rounded-card bg-background p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-extrabold text-ink">Coupon</p>
              <p className="mt-1 text-xs font-semibold text-muted">
                Placeholder only (no backend yet).
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="h-11 w-full rounded-full border border-border bg-background px-4 text-sm font-medium text-ink outline-none transition focus:border-primary focus:bg-secondary focus:ring-4 focus:ring-primary/10"
              value={''}
              disabled
            />

            <button
              type="button"
              className="btn btn-secondary"
              disabled
              title="Coupon verification not connected yet"
            >
              Apply
            </button>
          </div>

          <p className="mt-2 text-xs font-semibold text-muted">
            Discount: {couponDiscount === 0 ? 'Rs. 0' : formatPrice(couponDiscount)}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <span className="text-lg font-extrabold text-ink">Grand Total</span>
        <span className="text-2xl font-extrabold text-primary sm:text-3xl">
          {formatPrice(total)}
        </span>
      </div>

    </aside>
  )
}

function CheckoutPanel({ icon: Icon, title, description, children, className = '' }) {
  return (
    <section
      className={`rounded-[1.25rem] border border-border bg-secondary p-5 shadow-[0_14px_34px_rgb(36_22_10_/_0.07)] sm:p-6 ${className}`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <h2 className="text-xl font-extrabold text-ink">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
        </div>
      </div>
      <div className="mt-6 grid gap-4">{children}</div>
    </section>
  )
}


function FormField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-ink">
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </span>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`h-12 w-full rounded-full border bg-background px-4 text-sm font-medium text-ink outline-none transition placeholder:text-muted/70 focus:bg-secondary focus:ring-4 focus:ring-primary/10 ${
          error
            ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
            : 'border-border focus:border-primary'
        }`}
      />
      {error ? (
        <span className="text-xs font-semibold text-red-500">{error}</span>
      ) : null}
    </label>
  )
}

function PaymentOption({ value, title, description, checked, onChange }) {
  return (
    <label
      className={`flex cursor-pointer gap-3 rounded-card border p-4 transition ${
        checked
          ? 'border-primary bg-primary/5'
          : 'border-border bg-background hover:border-accent'
      }`}
    >
      <input
        type="radio"
        name="paymentMethod"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="mt-1 size-4 accent-primary"
      />
      <span>
        <span className="block text-sm font-extrabold text-ink">{title}</span>
        <span className="mt-1 block text-sm leading-6 text-muted">
          {description}
        </span>
      </span>
    </label>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="font-semibold text-muted">{label}</span>
      <span className="font-extrabold text-ink">{value}</span>
    </div>
  )
}

export default Checkout
