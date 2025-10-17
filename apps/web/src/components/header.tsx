type HeaderProps = {
  handleLogoClick: () => void;
};

export const Header = ({ handleLogoClick }: HeaderProps) => {
  return (
    <header className="content-center p-2 shrink-0">
      <button
        className="text-7xl text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700 inline-block pl-10 hover:cursor-pointer"
        type="button"
        onClick={handleLogoClick}
      >
        <h2 className="italic inline-block font-bold">Globe</h2>
        <h2 className="inline-block text-yellow-300 tracking-widest">Cast</h2>
        <p className="text-[1.31rem] pt-2 text-primary tracking-widest font-light italic">
          -traveling made easy
        </p>
      </button>
      <div className="h-1 w-[99%] mx-auto mt-4 bg-gradient-to-r from-yellow-300 to-blue-700 rounded-full"></div>
    </header>
  );
};
