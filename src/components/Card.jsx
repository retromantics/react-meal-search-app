

export default function Card({ children }) {
  return (
    <div className=" bg-gray-800 text-white max-w-sm rounded shadow-lg overflow-hidden p-4">
      {children}
    </div>
  )
}
