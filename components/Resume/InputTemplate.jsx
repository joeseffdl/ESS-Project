function InputTemplate({ children }) {
  return (
    <div
      className="bg-primary border-t-2 border-secondary-focus w-full h-screen p-5 xl:h-auto
                "
    >
      <div className="h-full bg-primary-content/60 shadow-2xl rounded-xl border-2 border-accent-focus">
        <div className="h-full flex flex-col items-center justify-center gap-5 p-5">
          {children}
        </div>
      </div>
    </div>
  );
}

export default InputTemplate;
