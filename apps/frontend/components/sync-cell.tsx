export const SyncCell = ({
  name = "Untitled",
  index,
  image,
  onClick,
}: {
  name?: string
  image?: string
  index: number
  onClick?: () => void
}) => {
  return (
    <div
      onClick={onClick}
      className="flex h-12 w-full max-w-xs cursor-pointer items-center gap-3 rounded-lg border border-dotted border-neutral-400 bg-neutral-900 px-4 text-white transition hover:border-white hover:bg-neutral-800"
    >
      {/* Image (optional) */}
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt="icon"
          className="flex h-6 w-6 items-center rounded-full object-cover"
        />
      )}

      {/* Index */}
      <span className="text-sm font-semibold text-neutral-400">{index}.</span>

      {/* Name */}
      <span className="text-sm font-medium text-neutral-200">{name}</span>
    </div>
  )
}
