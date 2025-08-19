export default function FeatureCard({
    icon,
    title,
    desc,
  }: {
    icon: string;
    title: string;
    desc: string;
  }) {
    return (
      <div className="rounded-2xl border border-indigo-100 bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">
        <div className="mb-3 text-4xl">{icon}</div>
        <h3 className="mb-2 text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600">{desc}</p>
      </div>
    );
  }