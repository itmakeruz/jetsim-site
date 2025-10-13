function Loader({ isFullScreen = false, className = "" }) {
  return (
    <div
      className={`${isFullScreen ? "fixed" : "absolute"} ${className}
      } inset-0 z-[10] bg-[#F5F6F8] grid place-content-center`}
    >
      <span className="loader"></span>
    </div>
  );
}

export default Loader;
