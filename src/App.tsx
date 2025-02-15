import { ActionModeProvider } from './context/ActionModeContext';
import { CardProvider } from './context/CardsContext';
import { LoadingProvider } from './context/LoadingContext';

import HomePage from './pages/HomePage';
import MusicPlayer from './components/items/MusicPlayer';
import { EventProvider } from './context/EventContext';

const App = () => {
  return (
    <LoadingProvider>
      <ActionModeProvider>
        <CardProvider>
          <EventProvider>
            <HomePage />
            <MusicPlayer className='fixed top-[2.5rem] sm:top-[1.5rem] right-[1rem] z-999' />
          </EventProvider>
        </CardProvider>
      </ActionModeProvider>
    </LoadingProvider>
  );
}

export default App;
