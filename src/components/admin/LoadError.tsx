export default function LoadError({ message }: { message: string }) {
  return (
    <div role="alert" className="rounded-2xl border border-night-line bg-night-panel p-6">
      <h2 className="wide text-xl font-extrabold">Couldn&apos;t load this content</h2>
      <p className="mt-2 text-night-faint">{message}</p>
      <p className="mt-2 text-sm text-night-faint">The public site isn&apos;t affected.</p>
    </div>
  );
}
