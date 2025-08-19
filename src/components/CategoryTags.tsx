export default function CategoryTags({
    tags,
    onClick,
  }: {
    tags: string[];
    onClick: (tag: string) => void;
  }) {
    return (
      <div className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-3">
        {tags.map((c) => (
          <button
            key={c}
            onClick={() => onClick(c)}
            className="rounded-full bg-white px-4 py-2 font-semibold text-gray-700 shadow-md transition hover:-translate-y-0.5 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-500 hover:text-white hover:shadow-[0_10px_25px_rgba(99,102,241,0.3)]"
          >
            {c}
          </button>
        ))}
      </div>
    );
  }