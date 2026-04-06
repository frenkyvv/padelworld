'use client'

import React, { useState } from 'react';
import { deleteField, doc, setDoc } from "firebase/firestore";
import { db } from '@/lib/firebase';
import {
  FIXED_AMERICANAS_ABRIL_GAME_NUMBERS,
  FIXED_AMERICANAS_ABRIL_PLAYER_COLLECTION_PATH,
  FIXED_AMERICANAS_ABRIL_PLAYER_IDS,
} from '@/lib/fixedAmericanasAbril';

const ResetFixedAmericanasAbrilData = () => {
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    const confirmed = window.confirm(
      'Esto borrará todos los marcadores del rol fijo Americanas Abril. ¿Deseas continuar?'
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);

    try {
      const scoreFields = FIXED_AMERICANAS_ABRIL_GAME_NUMBERS.reduce(
        (accumulator, gameNumber) => ({
          ...accumulator,
          [`j${gameNumber}`]: deleteField(),
        }),
        {},
      );

      for (const playerId of FIXED_AMERICANAS_ABRIL_PLAYER_IDS) {
        const playerRef = doc(
          db,
          ...FIXED_AMERICANAS_ABRIL_PLAYER_COLLECTION_PATH,
          playerId,
        );

        await setDoc(playerRef, scoreFields, { merge: true });
      }

      alert('Marcadores del rol fijo borrados. Ya puedes volver a capturarlos.');
    } catch (error) {
      console.error('Error al borrar los datos del rol fijo: ', error);
      alert('No se pudieron borrar los marcadores del rol fijo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleReset} disabled={loading}>
      {loading ? 'Borrando marcadores...' : 'Borrar marcadores del rol fijo'}
    </button>
  );
};

export default ResetFixedAmericanasAbrilData;
