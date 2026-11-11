export default function Heading({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h1 className="wide text-3xl font-extrabold sm:text-4xl">{title}</h1>
      {children && <p className="mt-1 text-graphite">{children}</p>}
    </div>
  );
}
