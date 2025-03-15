import Link from "next/link"

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/menu" className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Menu Items</h2>
          <p className="text-gray-600">Manage your coffee shop menu items</p>
        </Link>

        <Link href="/admin/offers" className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Offers</h2>
          <p className="text-gray-600">Manage special offers and promotions</p>
        </Link>

        <Link href="/admin/staff" className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Staff</h2>
          <p className="text-gray-600">Manage staff members</p>
        </Link>

        <Link href="/admin/users" className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <p className="text-gray-600">Manage admin users</p>
        </Link>

        <Link href="/api/auth/logout" className="p-6 bg-red-50 rounded-lg shadow hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2 text-red-600">Logout</h2>
          <p className="text-gray-600">Sign out of your account</p>
        </Link>
      </div>
    </div>
  )
}

