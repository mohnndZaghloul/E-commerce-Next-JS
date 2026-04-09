export default function ErrorMessage({
  message,
}: {
  message: String | undefined;
}) {
  return <p className="text-destructive text-end text-sm">{message}</p>;
}
