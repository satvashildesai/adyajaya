"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { cn } from "@/lib/utils";

// ─── Constants ──────────────────────────────────────────────────────────────

const CATEGORIES = [
  "Learning",
  "Fitness",
  "Health",
  "Mindfulness",
  "Creativity",
  "Finance",
  "Social",
  "Other",
] as const;

const FREQUENCIES = [
  { label: "Every day", value: "daily" },
  { label: "Weekdays only (Mon–Fri)", value: "weekdays" },
  { label: "Weekends only (Sat–Sun)", value: "weekends" },
  { label: "3 times a week", value: "3x_week" },
] as const;

const ICONS = ["📚", "🏃", "💧", "🧘", "✍️", "🎯", "💪", "🌱", "🎵", "🍎", "☀️", "🔥"] as const;

const COLORS = [
  { label: "Indigo", value: "indigo", class: "bg-indigo-500" },
  { label: "Emerald", value: "emerald", class: "bg-emerald-500" },
  { label: "Rose", value: "rose", class: "bg-rose-500" },
  { label: "Amber", value: "amber", class: "bg-amber-500" },
  { label: "Sky", value: "sky", class: "bg-sky-500" },
  { label: "Violet", value: "violet", class: "bg-violet-500" },
] as const;

// ─── Form state types ────────────────────────────────────────────────────────

interface FormValues {
  name: string;
  description: string;
  category: string;
  icon: string;
  frequency: string;
  startDate: string;
  reminderTime: string;
  color: string;
}

interface FormErrors {
  name?: string;
  description?: string;
  category?: string;
  reminderTime?: string;
}

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) {
    errors.name = "Streak name is required.";
  } else if (values.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters.";
  } else if (values.name.trim().length > 60) {
    errors.name = "Name must be 60 characters or fewer.";
  }
  if (values.description.length > 200) {
    errors.description = "Description must be 200 characters or fewer.";
  }
  if (!values.category) {
    errors.category = "Please select a category.";
  }
  return errors;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function CreateStreakForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});

  const [values, setValues] = useState<FormValues>({
    name: "",
    description: "",
    category: "",
    icon: "📚",
    frequency: "daily",
    startDate: todayISO(),
    reminderTime: "20:00",
    color: "indigo",
  });

  const errors = validate(values);
  const hasErrors = Object.keys(errors).length > 0;

  const fieldError = (field: keyof FormErrors) =>
    touched[field] ? errors[field] : undefined;

  const touch = (field: keyof FormValues) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const set = (field: keyof FormValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setValues((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Touch all fields to show validation
    setTouched({ name: true, description: true, category: true, reminderTime: true });
    if (hasErrors) return;

    setSubmitting(true);
    // Mock async submission delay
    await new Promise((res) => setTimeout(res, 800));
    setSubmitting(false);
    setSubmitted(true);

    // Navigate home after brief success moment
    setTimeout(() => router.push("/"), 600);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="text-5xl animate-bounce">🎉</div>
        <h2 className="text-xl font-bold text-foreground">Streak created!</h2>
        <p className="text-muted-foreground text-sm">Taking you back home…</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">

      {/* Name */}
      <FormField
        label="What do you want to accomplish?"
        htmlFor="streak-name"
        error={fieldError("name")}
        hint="Give your streak a clear, motivating name."
        required
      >
        <Input
          id="streak-name"
          placeholder="e.g. Learn React Native"
          value={values.name}
          onChange={set("name")}
          onBlur={() => touch("name")}
          aria-describedby={errors.name ? "streak-name-error" : undefined}
          aria-invalid={!!fieldError("name")}
          maxLength={60}
          autoFocus
        />
        <p className="text-right text-xs text-muted-foreground">
          {values.name.length}/60
        </p>
      </FormField>

      {/* Description */}
      <FormField
        label="Description"
        htmlFor="streak-description"
        error={fieldError("description")}
        hint="Optional. Remind yourself why this matters."
      >
        <Textarea
          id="streak-description"
          placeholder="Practice React Native daily to build my app"
          value={values.description}
          onChange={set("description")}
          onBlur={() => touch("description")}
          maxLength={200}
        />
        <p className="text-right text-xs text-muted-foreground">
          {values.description.length}/200
        </p>
      </FormField>

      {/* Category */}
      <FormField
        label="Category"
        htmlFor="streak-category"
        error={fieldError("category")}
        required
      >
        <Select
          id="streak-category"
          value={values.category}
          onChange={set("category")}
          onBlur={() => touch("category")}
          aria-invalid={!!fieldError("category")}
        >
          <option value="" disabled>
            Select a category…
          </option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
      </FormField>

      {/* Icon picker */}
      <FormField label="Icon" htmlFor="streak-icon">
        <div
          role="radiogroup"
          aria-label="Choose an icon"
          className="flex flex-wrap gap-2"
        >
          {ICONS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              role="radio"
              aria-checked={values.icon === emoji}
              onClick={() => setValues((prev) => ({ ...prev, icon: emoji }))}
              className={cn(
                "h-11 w-11 rounded-xl text-xl transition-all border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                values.icon === emoji
                  ? "border-primary bg-primary/10 scale-110 shadow-sm"
                  : "border-border bg-background hover:border-primary/40 hover:bg-muted"
              )}
            >
              {emoji}
            </button>
          ))}
        </div>
      </FormField>

      {/* Frequency */}
      <FormField label="Frequency" htmlFor="streak-frequency">
        <Select
          id="streak-frequency"
          value={values.frequency}
          onChange={set("frequency")}
        >
          {FREQUENCIES.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </FormField>

      {/* Start date + Reminder — side by side on tablet+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Start date" htmlFor="streak-start">
          <Input
            id="streak-start"
            type="date"
            value={values.startDate}
            onChange={set("startDate")}
            min={todayISO()}
          />
        </FormField>
        <FormField label="Reminder time" htmlFor="streak-reminder">
          <Input
            id="streak-reminder"
            type="time"
            value={values.reminderTime}
            onChange={set("reminderTime")}
          />
        </FormField>
      </div>

      {/* Color picker */}
      <FormField label="Color theme" htmlFor="streak-color">
        <div
          role="radiogroup"
          aria-label="Choose a color"
          className="flex flex-wrap gap-3"
        >
          {COLORS.map(({ label, value, class: cls }) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-label={label}
              aria-checked={values.color === value}
              onClick={() => setValues((prev) => ({ ...prev, color: value }))}
              className={cn(
                "h-9 w-9 rounded-full border-4 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                cls,
                values.color === value
                  ? "border-foreground scale-110 shadow-md"
                  : "border-transparent hover:scale-105"
              )}
            />
          ))}
        </div>
      </FormField>

      {/* Submit */}
      <div className="pt-2">
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={submitting}
        >
          {submitting ? "Creating…" : "Create Streak 🔥"}
        </Button>
      </div>
    </form>
  );
}
