import { modules } from "./modules/module";
import { ModuleCard } from "./core/components/ModuleCard";
import logo from "/logo_resized.png";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import useDarkMode from "./core/hooks/use-darkmode";

function App() {
  const [darkMode, setDarkMode] = useDarkMode();
  return (
    <>
          <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-2 right-6 md:top-4 md:right-12 text-white hover:text-secondary transition-colors focus:outline-none"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? (
          <SunIcon className="h-6 w-6" />
        ) : (
          <MoonIcon className="h-6 w-6" />
        )}
      </button>
      <div className="select-none flex flex-col items-center pb-8">
        <header className="mt-12 2xl:mt-24 flex flex-col items-center">
          <div className="flex item font-rubik">
            <h1 className="inline">Welc</h1>
            <img className="inline w-12 md:w-24" src={logo} />
            <h1 className="inline">me to KIGS</h1>
          </div>
          <h2 className="text-center mt-2 font-rubik">
            An attempt into adding some fun while learning!
          </h2>
        </header>

        <nav className="mt-8 sm:mt-12 2xl:mt-24 flex flex-row justify-center gap-4 sm:gap-8 2xl:gap-16 w-100 sm:w-5/6 2xl:w-3/6 flex-wrap">
          {modules.map((m, i) => (
            <ModuleCard
              key={m.title}
              index={i}
              description={m.description}
              title={m.title}
              path={m.path}
            />
          ))}
        </nav>
      </div>
      <div className="mt-12 mb-8 mx-auto w-full flex flex-col items-center sm:w-5/6 2xl:w-3/6">
        <p>
          Made by IzioDev for the Kaspa Community - Feel free to contact me on
          Discord for any module requests or for pointing at content errors
        </p>
        <a href="https://github.com/IzioDev/kigs">Github Repository</a>
      </div>
    </>
  );
}

export default App;
