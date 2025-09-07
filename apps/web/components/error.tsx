const Error = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-unit-bg select-none">
      <div className="mb-5 text-lg text-error-text font-medium">
        Error. Please try again!
      </div>
      <button
        className="bg-black rounded-md text-base text-white p-2 hover:bg-black/70 hover:scale-[1.02]"
        onClick={() => window.location.reload()}
      >
        Reload
      </button>
    </div>
  );
};

export default Error;
