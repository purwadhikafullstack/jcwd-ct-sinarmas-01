export default function formatRp (input) {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  })

  return formatter.format(input);
}