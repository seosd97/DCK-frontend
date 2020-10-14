import React, { createContext, useEffect, useState } from 'react';
import * as DDragon from '../api/data-dragon';

const initialData = {
  isLoading: true,
  version: '',
  championList: {},
  spellList: {},
  runeList: {}
};

export const store = createContext(initialData);

export const DDragonProvider = ({ children }) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (data.version === '') {
      DDragon.getVersion().then(v => {
        DDragon.getGameDatas(v).then(d => {
          let championData = {};
          let spellData = {};
          let runeData = {};

          Object.entries(d.champion.data).forEach(o => {
            const [, value] = o;
            championData[value.key] = value;
          });

          Object.entries(d.spell.data).forEach(o => {
            const [, value] = o;
            spellData[value.key] = value;
          });

          Object.entries(d.rune).forEach(o => {
            const [, value] = o;
            runeData[value.id] = value;
          });

          setData({
            isLoading: false,
            version: v,
            championList: championData,
            spellList: spellData,
            runeList: runeData
          });
        });
      });
    }
  }, []);

  return <store.Provider value={data}>{children}</store.Provider>;
};
