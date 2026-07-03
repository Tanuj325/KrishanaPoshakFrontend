import { NavLink } from 'react-router-dom'
import { FiArrowRight, FiCheck, FiEye, FiTarget } from 'react-icons/fi'
import FeatureCard from '../components/FeatureCard'
import { businessStory, mission, timeline, vision } from '../data/about'
import { whyChooseUs } from '../data/home'
import { APP_NAME } from '../utils/constants'

function About() {
  return (
    <>
      <HeroSection />
      <StorySection />
      <MissionVisionSection />
      <TimelineSection />
      <WhyChooseUsSection />
      <CtaSection />
    </>
  )
}

function HeroSection() {
  return (
    <section className="section-padding bg-premium">
      <div className="app-container">
        <div className="max-w-3xl">
          <span className="eyebrow">About Us</span>
          <h1 className="mt-3 text-4xl font-extrabold text-ink sm:text-5xl">
            Devotion woven into every detail
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted">
            {APP_NAME} creates premium spiritual poshak, jewellery, and puja
            essentials for families who celebrate faith with beauty and care.
          </p>
        </div>
      </div>
    </section>
  )
}

function StorySection() {
  return (
    <section className="section-padding">
      <div className="app-container">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="relative">
            <div className="overflow-hidden rounded-[1.25rem] border border-border shadow-premium">
              <img
                src={businessStory.image}
                alt={businessStory.imageAlt}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 sm:absolute sm:-bottom-6 sm:left-6 sm:right-6 sm:mt-0">
              {businessStory.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-card border border-border bg-secondary p-4 text-center shadow-[0_10px_26px_rgb(36_22_10_/_0.08)]"
                >
                  <p className="text-xl font-extrabold text-primary sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pt-4">
            <span className="eyebrow">{businessStory.eyebrow}</span>
            <h2 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
              {businessStory.title}
            </h2>
            <div className="mt-6 grid gap-4">
              {businessStory.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-base leading-8 text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MissionVisionSection() {
  return (
    <section className="section-padding bg-secondary/60">
      <div className="app-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Purpose</span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
            What drives us forward
          </h2>
          <p className="mt-4 text-muted">
            Our mission and vision guide every collection, every stitch, and every
            interaction with our devotees.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <PurposeCard
            icon={FiTarget}
            title={mission.title}
            description={mission.description}
            highlights={mission.highlights}
          />
          <PurposeCard
            icon={FiEye}
            title={vision.title}
            description={vision.description}
            highlights={vision.highlights}
          />
        </div>
      </div>
    </section>
  )
}

function PurposeCard({ icon: Icon, title, description, highlights }) {
  return (
    <article className="rounded-[1.25rem] border border-border bg-secondary p-6 shadow-premium sm:p-8">
      <span className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>
      <h3 className="mt-5 text-2xl font-extrabold text-ink">{title}</h3>
      <p className="mt-3 text-base leading-8 text-muted">{description}</p>
      <ul className="mt-6 grid gap-3">
        {highlights.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm font-medium leading-6 text-ink"
          >
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent/20 text-accent">
              <FiCheck className="size-3" />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </article>
  )
}

function TimelineSection() {
  return (
    <section className="section-padding">
      <div className="app-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Our Journey</span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
            A timeline of devotion
          </h2>
          <p className="mt-4 text-muted">
            From a small Vrindavan workshop to a growing spiritual brand — here is
            how {APP_NAME} has evolved.
          </p>
        </div>

        <div className="relative mx-auto mt-12 max-w-3xl">
          <div
            className="absolute left-4 top-0 hidden h-full w-px bg-border sm:left-1/2 sm:block sm:-translate-x-1/2"
            aria-hidden="true"
          />
          <div
            className="absolute left-4 top-0 h-full w-px bg-border sm:hidden"
            aria-hidden="true"
          />

          <ol className="grid gap-8">
            {timeline.map((item, index) => (
              <li
                key={item.year + item.title}
                className={`relative grid gap-4 sm:grid-cols-2 sm:gap-8 ${
                  index % 2 === 0 ? '' : 'sm:[&>div:first-child]:order-2'
                }`}
              >
                <div
                  className={`hidden sm:block ${
                    index % 2 === 0 ? 'text-right' : 'text-left'
                  }`}
                >
                  <span className="text-2xl font-extrabold text-primary">
                    {item.year}
                  </span>
                </div>

                <div className="relative pl-10 sm:pl-0">
                  <span
                    className="absolute left-2.5 top-1.5 size-3 rounded-full border-2 border-secondary bg-primary sm:left-1/2 sm:-translate-x-1/2"
                    aria-hidden="true"
                  />
                  <article className="rounded-[1.25rem] border border-border bg-secondary p-5 shadow-[0_14px_34px_rgb(36_22_10_/_0.07)] sm:p-6">
                    <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-primary sm:hidden">
                      {item.year}
                    </span>
                    <h3 className="mt-1 text-lg font-extrabold text-ink sm:mt-0">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted">
                      {item.description}
                    </p>
                  </article>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function WhyChooseUsSection() {
  return (
    <section className="section-padding bg-ink text-secondary">
      <div className="app-container">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <span className="eyebrow">Why Choose Us</span>
            <h2 className="mt-3 text-4xl font-extrabold leading-tight text-secondary sm:text-5xl">
              Premium quality with devotional care
            </h2>
            <p className="mt-5 text-base leading-8 text-secondary/68">
              {APP_NAME} combines traditional inspiration with a polished modern
              experience, making every purchase feel thoughtful and trustworthy.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {whyChooseUs.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CtaSection() {
  return (
    <section className="section-padding">
      <div className="app-container">
        <div className="rounded-[1.5rem] border border-border bg-gradient-to-br from-primary/10 via-secondary to-accent/10 p-8 text-center shadow-premium sm:p-12">
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
            Ready to explore our collection?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Discover handcrafted poshak, jewellery, and puja essentials made for
            your next festival, seva, or gifting moment.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <NavLink to="/shop" className="btn btn-primary btn-lg">
              Shop Collection
              <FiArrowRight className="size-5" />
            </NavLink>
            <NavLink to="/contact" className="btn btn-secondary btn-lg">
              Contact Us
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
