'use client';
import React, { useEffect, useState } from 'react';
import { namesData } from '@/app/lib/data';

function App() {
  const [castellano, setCastellano] = useState('');
  const [coreano, setCoreano] = useState('');
  const [nameDetails, setNameDetails] = useState<{
    significado: string;
    pronunciacion: string;
    cultura: string;
  } | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCastellano(e.target.value);
  };

  const normalizeString = (str: string) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedCastellano = normalizeString(castellano);

    const matchedName = namesData.nameMappings.find(
      (name) => normalizeString(name.castellano) === normalizedCastellano
    );

    if (matchedName) {
      setCoreano(matchedName.coreano);
      setNameDetails(matchedName.details);
    } else {
      setCoreano('No se ha encontrado nada 😭');
      setNameDetails(null);
    }
  };

  useEffect(() => {
    // Load the Twitter SDK
    const twitterScript = document.createElement('script');
    twitterScript.src = 'https://platform.twitter.com/widgets.js';
    twitterScript.async = true;
    document.body.appendChild(twitterScript);

    // Manually re-render Twitter widgets when component mounts or updates
    const renderTwitterWidgets = () => {
      if ((window as any).twttr && (window as any).twttr.widgets) {
        (window as any).twttr.widgets.load();
      }
    };

    renderTwitterWidgets();

    // Cleanup
    return () => {
      document.body.removeChild(twitterScript);
    };
  }, [coreano]);

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4'>
      <header className='text-center mb-8'>
        <h1 className='text-3xl font-bold'>Tu Nombre en Coreano 🇰🇷</h1>
        <p className='text-gray-600'>
          Descubre tu nombre coreano y el significado
        </p>
      </header>

      <main className='w-full max-w-md bg-white p-6 rounded-lg shadow-md'>
        <form onSubmit={handleSubmit} className='mb-6'>
          <input
            type='text'
            placeholder='Escribe tu nombre'
            value={castellano}
            onChange={handleNameChange}
            className='w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
          <button
            type='submit'
            className='w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
          >
            Encuentra tu nombre coreano
          </button>
        </form>

        {coreano && (
          <div className='result-section text-center'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>{coreano}</h2>
            <p className='font-bold text-gray-800 mb-4'>
              ({nameDetails?.pronunciacion})
            </p>
            {nameDetails ? (
              <>
                <p className='mb-2'>
                  <strong>Significado:</strong> {nameDetails.significado}
                </p>
                <p>{nameDetails.cultura}</p>
                <div className='flex space-x-4'>
                  {/* Facebook Share Button */}
                  <div
                    className='fb-share-button'
                    data-href='https://tunombreencoreano.com'
                    data-layout='button_count'
                  ></div>

                  {/* Twitter Share Button */}
                  <a
                    href='https://twitter.com/share'
                    className='twitter-share-button'
                    data-url='https://tunombreencoreano.com'
                    data-text={`Mi nombre coreano es ${coreano}`}
                  >
                    Tweet
                  </a>
                </div>
              </>
            ) : (
              <p className='text-red-500'>No se ha encontrado el nombre.</p>
            )}
          </div>
        )}
      </main>

      <footer className='w-full max-w-md mt-8 flex justify-between items-center text-gray-600'>
        {/* <a href='#' className='text-blue-500 hover:underline'>
          Learn more about Korean names
          </a> */}
        {coreano && (
          <a href='https://www.buymeacoffee.com/sollee'>
            <img src='https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=sollee&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff' />
          </a>
        )}
      </footer>
    </div>
  );
}

export default App;
