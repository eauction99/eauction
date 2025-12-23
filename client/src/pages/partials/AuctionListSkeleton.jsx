export function AuctionListSkeleton() {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div
          key={idx}
          className="h-28 animate-pulse rounded-xl bg-slate-800/80"
        />
      ))}
    </div>
  );
}


