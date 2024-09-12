import { useEffect } from "react";

const Navbar = ({
  themeMode,
  classrooms,
  selectedClassroom,
  onClassroomSelect,
  setThemeMode,
  handleThemeMode,
  title,
  icon,
  iconbg,
}) => {
  // Effect to load the theme mode from localStorage on initial render
  useEffect(() => {
    const savedThemeMode = localStorage.getItem("themeMode");
    if (savedThemeMode) {
      setThemeMode(savedThemeMode);
    }
  }, []);

  // Effect to save the theme mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  return (
    <nav className="flex h-[72px] items-center justify-between px-3 sm:p-16 xl:w-full xl:px-0 xl:py-20">
      <div className="flex items-center gap-2">
        {/* Dropdown or list for classroom selection */}
        <label htmlFor="classroomSelect">Select Classroom:</label>
        <select
  value={selectedClassroom ? selectedClassroom.id : ""}
  onChange={(e) => {
    const selectedId = parseInt(e.target.value);
    const selectedClassroom = classrooms.find(
      (classroom) => classroom.id === selectedId
    );
    onClassroomSelect(selectedClassroom);
  }}
  className="p-2 border rounded-md text-sm font-medium sm:text-base md:text-lg lg:text-xl xl:text-2xl bg-white text-black dark:bg-darkNavy dark:text-white w-full sm:w-auto"
>
  {/* Provide a default option */}
  <option value="" disabled>
    Select a classroom
  </option>
  {classrooms.map((classroom) => (
    <option key={classroom.id} value={classroom.id}>
      {classroom.name}
    </option>
  ))}
</select>
      </div>

      {/* Conditional rendering for title and icon */}
      {title && icon && iconbg ? (
        <section className="flex items-center justify-start gap-4 sm:gap-6">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-md sm:h-14 sm:w-8"
            style={{ backgroundColor: iconbg }}
          >
            <img src={icon} alt={title} className="h-7 w-7 sm:h-10 sm:w-10" />
          </div>
          <h1 className="text-[18px] font-medium sm:text-[28px]">{title}</h1>
        </section>
      ) : (
        <section></section>
      )}

      {/* Theme Mode Toggle and Other Controls */}
      
    </nav>
  );
};

export default Navbar;
