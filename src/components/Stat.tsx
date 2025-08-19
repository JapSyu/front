export default function Stat({ number, label }: { number: string; label: string }) {
    return (
      <div className="text-center text-white">
        <span className="block text-4xl font-extrabold drop-shadow-md md:text-5xl">{number}</span>
        <div className="mt-1 text-sm opacity-90">{label}</div>
      </div>
    );
  }