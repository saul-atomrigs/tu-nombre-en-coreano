'use client';
import React, { useState } from 'react';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Find the matching Korean name from the data
    const matchedName = namesData.nameMappings.find(
      (name) => name.castellano.toLowerCase() === castellano.toLowerCase()
    );

    if (matchedName) {
      setCoreano(matchedName.coreano);
      setNameDetails(matchedName.details);
    } else {
      setCoreano('No se ha encontrado nada 😭');
      setNameDetails(null);
    }
  };

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

                <a href='https://www.buymeacoffee.com/sollee'>
                  <img src='https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=sollee&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff' />
                </a>
              </>
            ) : (
              <p className='text-red-500'>No se ha encontrado el nombre.</p>
            )}
          </div>
        )}
      </main>

      <footer className='w-full max-w-md mt-8 flex justify-between items-center text-gray-600'>
        <a href='#' className='text-blue-500 hover:underline'>
          Learn more about Korean names
        </a>
        <button className='py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors'>
          Compartir
        </button>
      </footer>
    </div>
  );
}

export default App;
