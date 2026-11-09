import { useInfiniteQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { ArrowDown, RefreshCcw } from "lucide-react";
import { regionGroupsQuery } from "@/hooks/queries";
import SimCard from "@/components/SimCard/SimCard";

export default function HomeSimCards({
  activeCategory,
}: {
  activeCategory: string | null;
}) {
  const { i18n, t } = useTranslation();
  const query = useInfiniteQuery({
    queryKey: ["regionGroup", activeCategory, i18n.language],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      regionGroupsQuery(activeCategory, 12, pageParam),
    getNextPageParam: (last, _pages, page) =>
      last.meta?.hasNextPage ? page + 1 : undefined,
    staleTime: 60000,
  });
  const groups = [
    ...new Map(
      (query.data?.pages.flatMap((page) => page.data) ?? []).map((group) => [
        group.id,
        group,
      ]),
    ).values(),
  ];
  if (query.isError && !groups.length)
    return (
      <div className="js-empty" role="alert">
        <p>{t("jetstream.catalogueError")}</p>
        <button
          type="button"
          className="js-btn js-btn--ghost"
          onClick={() => query.refetch()}
        >
          {t("jetstream.retry")}
          <RefreshCcw size={16} />
        </button>
      </div>
    );
  return (
    <>
      <div className="ew-destination-grid" aria-busy={query.isPending}>
        {query.isPending
          ? Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="js-skeleton h-[210px]"
                aria-hidden="true"
              />
            ))
          : groups.map((group, index) => (
              <SimCard
                key={group.id}
                regionGroup={group}
                activeCategory={activeCategory}
                index={index}
              />
            ))}
      </div>
      {!query.isPending && !groups.length && (
        <div className="js-empty">{t("jetstream.catalogueEmpty")}</div>
      )}
      {query.isFetchNextPageError && (
        <div className="js-empty" role="alert">
          <p>{t("jetstream.catalogueError")}</p>
          <button
            className="js-btn js-btn--ghost"
            onClick={() => query.fetchNextPage()}
          >
            {t("jetstream.retry")}
          </button>
        </div>
      )}
      {query.hasNextPage && !query.isFetchNextPageError && (
        <div className="js-load-more">
          <button
            type="button"
            className="js-btn js-btn--ghost"
            onClick={() => query.fetchNextPage()}
            disabled={query.isFetchingNextPage}
          >
            {t(
              query.isFetchingNextPage
                ? "common.loading"
                : "jetstream.loadMore",
            )}
            <ArrowDown size={16} />
          </button>
        </div>
      )}
    </>
  );
}
