export default function ErrorMessage({
  message,
}: {
  message: String | undefined;
}) {
  return <p className="text-red-500 text-end">{message}</p>;
}
