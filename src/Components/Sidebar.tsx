import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white">
      <div className="p-6 text-xl font-bold">Admin Dashboard</div>
      <div className="mt-8">
        <ul>
          <li className="px-6 py-3 hover:bg-gray-700">
            <Link href="/admin/dashboard?section=products">
              Quản lý Sản phẩm
            </Link>
          </li>
          <li className="px-6 py-3 hover:bg-gray-700">
            <Link href="/admin/dashboard?section=categories">
              Quản lý Thể loại
            </Link>
          </li>
          <li className="px-6 py-3 hover:bg-gray-700">
            <Link href="/admin/dashboard?section=brands">
              Quản lý Thương hiệu
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
