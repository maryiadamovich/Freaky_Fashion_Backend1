
export default function Data() {

  const data = new Date().getFullYear();

  return (
    <div className="flex justify-center">
      <span>Freaky Fashion @ {data}</span>
    </div>
  );
}
