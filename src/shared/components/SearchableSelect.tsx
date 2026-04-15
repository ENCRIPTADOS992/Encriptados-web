"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useId,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search, X } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface SearchableSelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  /** Texto alternativo para búsqueda (ej: sin acentos) */
  searchLabel?: string;
  /** Subtexto secundario bajo el label */
  description?: string;
}

export type SearchableSelectVariant = "dark" | "light" | "tim";

export interface SearchableSelectProps {
  options: SearchableSelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  dropdownClassName?: string;
  /** Variante visual */
  variant?: SearchableSelectVariant;
  /** Mostrar input de búsqueda (true por defecto) */
  searchable?: boolean;
  /** Permitir limpiar selección */
  clearable?: boolean;
  /** Mostrar radio button en cada item */
  showRadio?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function normalizeText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/* ------------------------------------------------------------------ */
/*  Variant styles                                                     */
/* ------------------------------------------------------------------ */

const VARIANTS: Record<
  SearchableSelectVariant,
  {
    trigger: string;
    triggerActive: string;
    dropdown: string;
    input: string;
    item: string;
    itemActive: string;
    itemText: string;
    itemTextActive: string;
    noResults: string;
    radioBase: string;
    radioActive: string;
    chevron: string;
    chevronActive: string;
  }
> = {
  dark: {
    trigger:
      "border-gray-300 text-[#7E7E7E] bg-[#222222]",
    triggerActive:
      "border-[#CCCCCC] text-[#CCCCCC] bg-[#3E3E3E]",
    dropdown:
      "bg-[#222222] border-[#3E3E3E]",
    input:
      "bg-[#18191B] text-white border-[#3E3E3E] placeholder:text-[#7E7E7E]",
    item: "bg-[#222222] hover:bg-[#3E3E3E]",
    itemActive: "bg-[#3E3E3E]",
    itemText: "text-[#7E7E7E]",
    itemTextActive: "text-[#CCCCCC]",
    noResults: "text-[#7E7E7E]",
    radioBase: "border-[#555] bg-[#232427]",
    radioActive: "border-cyan-700 bg-cyan-700",
    chevron: "text-[#7E7E7E]",
    chevronActive: "text-[#CCCCCC]",
  },
  light: {
    trigger:
      "border-transparent text-[#7E7E7E] bg-[#F5F5F5]",
    triggerActive:
      "border-[#00A3FF] text-[#171717] bg-[#F5F5F5]",
    dropdown:
      "bg-white border-[#D0D0D0]",
    input:
      "bg-[#F4F4F4] text-[#171717] border-[#D0D0D0] placeholder:text-[#9CA3AF]",
    item: "bg-white hover:bg-[#F4F4F4]",
    itemActive: "bg-[#E6F3FF]",
    itemText: "text-[#374151]",
    itemTextActive: "text-[#171717]",
    noResults: "text-[#9CA3AF]",
    radioBase: "border-[#D1D5DB] bg-white",
    radioActive: "border-[#00A3FF] bg-[#00A3FF]",
    chevron: "text-gray-600",
    chevronActive: "text-[#00A3FF]",
  },
  tim: {
    trigger:
      "border-[#D0D0D0] text-[#171717] bg-[#EDEDED]",
    triggerActive:
      "border-[#009DFF] text-[#171717] bg-[#EDEDED]",
    dropdown:
      "bg-white border-[#D0D0D0]",
    input:
      "bg-[#F4F4F4] text-[#171717] border-[#D0D0D0] placeholder:text-[#9CA3AF]",
    item: "bg-transparent hover:bg-[#F0F8FF]",
    itemActive: "bg-[#E6F3FF]",
    itemText: "text-[#374151]",
    itemTextActive: "text-[#171717]",
    noResults: "text-[#9CA3AF]",
    radioBase: "border-[#D1D5DB] bg-white",
    radioActive: "border-[#009DFF] bg-[#009DFF]",
    chevron: "text-gray-600",
    chevronActive: "text-[#009DFF]",
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Seleccionar...",
  searchPlaceholder = "Buscar...",
  disabled = false,
  className = "",
  dropdownClassName = "",
  variant = "dark",
  searchable = true,
  clearable = false,
  showRadio = false,
}: SearchableSelectProps) {
  const uid = useId();
  const listboxId = `ss-listbox-${uid}`;

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const v = VARIANTS[variant];

  const selectedOption = useMemo(
    () => options.find((o) => o.value === value),
    [options, value]
  );

  const hasValue = !!selectedOption;

  const filtered = useMemo(() => {
    if (!search.trim()) return options;
    const term = normalizeText(search);
    return options.filter((o) =>
      normalizeText(o.searchLabel || o.label).includes(term)
    );
  }, [options, search]);

  // Reset highlight on search change
  useEffect(() => {
    setHighlightIndex(0);
  }, [search]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Focus input on open
  useEffect(() => {
    if (open && searchable && inputRef.current) {
      // small delay to let the dropdown render
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open, searchable]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.children[highlightIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [highlightIndex, open]);

  const handleSelect = useCallback(
    (val: string) => {
      onChange(val);
      setOpen(false);
      setSearch("");
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) {
        if (e.key === "Enter" || e.key === "ArrowDown" || e.key === " ") {
          setOpen(true);
          e.preventDefault();
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          setHighlightIndex((i) => Math.min(i + 1, filtered.length - 1));
          e.preventDefault();
          break;
        case "ArrowUp":
          setHighlightIndex((i) => Math.max(i - 1, 0));
          e.preventDefault();
          break;
        case "Enter":
          if (filtered[highlightIndex]) {
            handleSelect(filtered[highlightIndex].value);
          }
          e.preventDefault();
          break;
        case "Escape":
          setOpen(false);
          setSearch("");
          e.preventDefault();
          break;
        case "Tab":
          setOpen(false);
          setSearch("");
          break;
      }
    },
    [open, filtered, highlightIndex, handleSelect]
  );

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onKeyDown={handleKeyDown}
    >
      {/* ---- Trigger ---- */}
      <button
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setOpen((v) => !v);
            setSearch("");
          }
        }}
        className={`
          flex items-center justify-between
          w-full border rounded-2xl shadow-md
          px-4 h-[56px]
          transition duration-150 ease-in-out
          ${hasValue ? v.triggerActive : v.trigger}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <span className="flex items-center gap-x-2 min-w-0 overflow-hidden">
          {selectedOption?.icon}
          <span className="truncate">
            {selectedOption?.label || placeholder}
          </span>
        </span>

        <span className="flex items-center gap-1 ml-2 flex-shrink-0">
          {clearable && hasValue && (
            <span
              role="button"
              tabIndex={-1}
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
                setOpen(false);
              }}
              className="p-0.5 rounded-full hover:bg-white/10"
            >
              <X className="w-3.5 h-3.5 opacity-60" />
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 opacity-60 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            } ${hasValue ? v.chevronActive : v.chevron}`}
          />
        </span>
      </button>

      {/* ---- Dropdown ---- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className={`
              absolute z-50 mt-2 w-full
              rounded-xl shadow-xl border
              overflow-hidden
              ${v.dropdown}
              ${dropdownClassName}
            `}
            style={{ boxShadow: "0px 24px 44px 0px rgba(0,0,0,0.08)" }}
          >
            {/* Search input */}
            {searchable && (
              <div className="p-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={searchPlaceholder}
                    className={`
                      w-full rounded-xl
                      pl-9 pr-4 py-2.5 text-sm
                      outline-none border
                      ${v.input}
                    `}
                    aria-label={searchPlaceholder}
                  />
                </div>
              </div>
            )}

            {/* Options list */}
            <ul
              id={listboxId}
              ref={listRef}
              role="listbox"
              className="max-h-60 overflow-y-auto p-1"
            >
              {filtered.map((option, idx) => {
                const isSelected = option.value === value;
                const isHighlighted = idx === highlightIndex;

                return (
                  <li
                    key={option.value}
                    id={`${listboxId}-opt-${idx}`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(option.value)}
                    onMouseEnter={() => setHighlightIndex(idx)}
                    className={`
                      flex items-center gap-2
                      px-3 py-2.5 mx-1 my-0.5
                      rounded-xl cursor-pointer
                      transition duration-100
                      ${isSelected ? v.itemActive : v.item}
                      ${isHighlighted && !isSelected ? "ring-1 ring-inset ring-white/10" : ""}
                    `}
                  >
                    {showRadio && (
                      <span
                        className={`
                          flex items-center justify-center
                          w-4 h-4 rounded-full border flex-shrink-0
                          ${isSelected ? v.radioActive : v.radioBase}
                        `}
                      >
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </span>
                    )}

                    {option.icon && (
                      <span className="flex-shrink-0">{option.icon}</span>
                    )}

                    <span className="flex flex-col min-w-0">
                      <span
                        className={`font-semibold text-sm truncate ${
                          isSelected ? v.itemTextActive : v.itemText
                        }`}
                      >
                        {option.label}
                      </span>
                      {option.description && (
                        <span className="text-xs opacity-60 truncate">
                          {option.description}
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}

              {filtered.length === 0 && (
                <li className={`px-3 py-3 text-sm text-center ${v.noResults}`}>
                  Sin resultados
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
