import { useState, useRef, useEffect, useMemo, useId } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, X, MapPin, RefreshCcw } from "lucide-react";
import { getAllRegions } from "@/hooks/queries";
import { useQuery } from "@tanstack/react-query";
import type { Region } from "@/types/api";
import { filterByUniversalSearch } from "@/lib/searchUtils";
import { getImageUrl } from "@/config/imageUtils";

const MAX_SELECTIONS = 3;
export default function HomeSearch() {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState<Region[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const id = useId();
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["regions", i18n.language],
    queryFn: () => getAllRegions(null, 5000),
    staleTime: 300000,
  });
  const options = useMemo(() => {
    const all = data?.data ?? [];
    const filtered = inputValue.trim()
      ? filterByUniversalSearch(all, inputValue.trim(), (region) => region.name)
      : all;
    return filtered
      .filter((region) => !selected.some((s) => s.id === region.id))
      .slice(0, 12);
  }, [data, inputValue, selected]);
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  const choose = (region: Region) => {
    if (selected.length >= MAX_SELECTIONS) return;
    setSelected((prev) => [...prev, region]);
    setInputValue("");
    setActive(0);
    setOpen(false);
    input.current?.focus();
  };
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selected.length) {
      setOpen(false);
      navigate(`/tariffs/ids=${selected.map((region) => region.id).join("-")}`);
    } else {
      setOpen(true);
      input.current?.focus();
    }
  };
  return (
    <div
      ref={ref}
      className="js-search"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <form onSubmit={submit}>
        <div className="js-search-row">
          <MapPin className="js-search-icon" size={23} aria-hidden="true" />
          <div className="js-search-field">
            <label htmlFor={`${id}-input`}>{t("jetstream.searchLabel")}</label>
            <input
              id={`${id}-input`}
              ref={input}
              type="search"
              value={inputValue}
              autoComplete="off"
              role="combobox"
              aria-expanded={open}
              aria-controls={`${id}-options`}
              aria-autocomplete="list"
              aria-describedby={`${id}-hint`}
              aria-activedescendant={
                open && options[active] ? `${id}-option-${active}` : undefined
              }
              placeholder={t("jetstream.searchPlaceholder")}
              onFocus={() => setOpen(true)}
              onChange={(event) => {
                setInputValue(event.target.value);
                setActive(0);
                setOpen(true);
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") setOpen(false);
                if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                  event.preventDefault();
                  setOpen(true);
                  setActive((current) =>
                    options.length
                      ? (current +
                          (event.key === "ArrowDown" ? 1 : -1) +
                          options.length) %
                        options.length
                      : 0,
                  );
                }
                if (
                  event.key === "Enter" &&
                  open &&
                  options[active] &&
                  selected.length < MAX_SELECTIONS
                ) {
                  event.preventDefault();
                  choose(options[active]);
                }
              }}
            />
          </div>
          <button
            className="js-btn js-btn--blue js-search-submit"
            type="submit"
            aria-label={t("jetstream.searchAction")}
          >
            <span>{t("jetstream.searchAction")}</span>
            <Search size={19} />
          </button>
        </div>
        {selected.length > 0 && (
          <div className="js-search-chips">
            {selected.map((region) => (
              <span className="js-search-chip" key={region.id}>
                <img src={getImageUrl(region.image)} alt="" />
                {region.name}
                <button
                  type="button"
                  onClick={() => {
                    setSelected((prev) =>
                      prev.filter((item) => item.id !== region.id),
                    );
                    input.current?.focus();
                  }}
                  aria-label={t("jetstream.searchRemove", {
                    name: region.name,
                  })}
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
      </form>
      <span className="sr-only" id={`${id}-hint`}>
        {t("jetstream.searchHelp")}
      </span>
      {open && (
        <div className="js-search-dropdown">
          <p className="js-search-note" aria-live="polite">
            {selected.length >= MAX_SELECTIONS
              ? t("jetstream.searchLimit")
              : t("jetstream.searchHelp")}
          </p>
          {isLoading ? (
            <p className="js-search-note" role="status">
              {t("common.loading")}
            </p>
          ) : isError ? (
            <div className="js-search-note" role="alert">
              {t("jetstream.searchError")}{" "}
              <button
                type="button"
                className="js-text-link"
                onClick={() => refetch()}
              >
                {t("jetstream.retry")}
                <RefreshCcw size={13} />
              </button>
            </div>
          ) : (
            <div
              id={`${id}-options`}
              role="listbox"
              aria-label={t("jetstream.searchSuggestions")}
            >
              {options.map((region, index) => (
                <button
                  type="button"
                  role="option"
                  aria-selected={index === active}
                  tabIndex={-1}
                  id={`${id}-option-${index}`}
                  className="js-search-option"
                  data-active={index === active}
                  disabled={selected.length >= MAX_SELECTIONS}
                  key={region.id}
                  onMouseEnter={() => setActive(index)}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => choose(region)}
                >
                  <img src={getImageUrl(region.image)} alt="" loading="lazy" />
                  {region.name}
                  <ArrowRight size={15} />
                </button>
              ))}
              {options.length === 0 && (
                <p className="js-search-note">{t("jetstream.noResults")}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
