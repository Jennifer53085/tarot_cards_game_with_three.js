import { ActionModeProvider } from './context/ActionModeContext';
import { CardProvider } from './context/CardsContext';
import { LoadingProvider } from './context/LoadingContext';
import { LanguageProvider } from './context/LanguageContext';

import HomePage from './pages/HomePage';
import MusicPlayer from './components/items/MusicPlayer';
import LanguageTranslater from './components/items/LanguageTranslater';
import { EventProvider } from './context/EventContext';
import Loading from './components/items/Loading';

const App = () => {
  return (
    <LanguageProvider>
      <LoadingProvider>
        <ActionModeProvider>
          <CardProvider>
            <EventProvider>
              <Loading />
              <HomePage />
              <div className='fixed top-[2.5rem] flex flex-wrap w-1/4 sm:top-[1.5rem] right-[1.25rem] z-999 items-center lg:w-1/4 justify-end gap-5'>
              <MusicPlayer className='cursor-pointer'/>
              <LanguageTranslater className='cursor-pointer'/>
              </div>
            </EventProvider>
          </CardProvider>
        </ActionModeProvider>
      </LoadingProvider>
    </LanguageProvider>
  );
}

export default App;
