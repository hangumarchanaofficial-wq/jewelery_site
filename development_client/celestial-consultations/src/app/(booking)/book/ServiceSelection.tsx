import { BookingSummary } from "./BookingSummary";
import { ServiceCard } from "./ServiceCard";
import type { ServiceOption } from "./types";

export function ServiceSelection({
  onContinue,
  onSelect,
  selectedService,
  services,
}: {
  onContinue: () => void;
  onSelect: (serviceId: string) => void;
  selectedService: ServiceOption | null;
  services: ServiceOption[];
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <section>
        <div className="booking-section-heading">
          <p className="booking-eyebrow">Step 1</p>
          <h2 className="booking-step-title">Choose the reading that fits your season</h2>
          <p className="booking-step-copy">
            Each session is private, online, and prepared with care. Select the consultation that
            best matches the question you are carrying now.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              onSelect={() => onSelect(service.id)}
              selected={selectedService?.id === service.id}
              service={service}
            />
          ))}
        </div>

        <div className="mt-6 xl:hidden">
          <BookingSummary
            canContinue={Boolean(selectedService)}
            ctaLabel="Continue to Date & Time"
            onContinue={onContinue}
            service={selectedService}
          />
        </div>
      </section>

      <div className="hidden xl:block">
        <BookingSummary
          canContinue={Boolean(selectedService)}
          ctaLabel="Continue to Date & Time"
          onContinue={onContinue}
          service={selectedService}
        />
      </div>
    </div>
  );
}
