function UserProfile() {
  return (
    <div className="user-profile bg-gray-100 sm:p-4 max-w-xs rounded-lg shadow-lg mx-auto my-20 md:p-8 md:max-w-sm  hover:shadow-xl">
      <img
        src="https://via.placeholder.com/150"
        alt="User"
        className="rounded-full sm:w-24 sm:h-24 mx-auto mb-5  md:w-36 md:h-36 hover:scale-110 transition-transform duration-300 ease-in-out"
      />
      <h1 className="text-blue-800 text-lg my-4 md:text-xl hover:text-blue-500">
        John Doe
      </h1>
      <p className="text-gray-600 text-sm md:text-base">
        Developer at Example Co. Loves to write code and explore new
        technologies.
      </p>
    </div>
  );
}

export default UserProfile;
