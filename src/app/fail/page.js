export default function FailPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-red-600 text-center px-4">
      <h1 className="text-4xl font-bold mb-4">❌ Payment Failed</h1>
      <p className="text-lg">Something went wrong. Please try again later.</p>
    </div>
  );
}
