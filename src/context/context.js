import React, { createContext, useEffect, useState } from 'react';
import * as DDragon from '../api/data-dragon';

const initialData = { version: '', championList: '' };

export const store = createContext(initialData);

export const DDragonProvider = ({ children }) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (data.version === '') {
      DDragon.getVersion().then(v => {
        DDragon.getChampions(v).then(c => {
          let list = {};
          Object.entries(c.data).forEach(d => {
            const [key, value] = d;
            list[value.key] = value;
          });

          setData({ version: v, championList: list });
        });
      });
    }
  }, []);

  return <store.Provider value={data}>{children}</store.Provider>;
};
