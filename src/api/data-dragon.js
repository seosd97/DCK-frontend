import Axios from 'axios';
import _ from 'underscore';

const endpoint = 'http://ddragon.leagueoflegends.com/cdn/';

let championCache = {};
let championCacheById = {};

export const getVersion = async () => {
  const version = await Axios.get('https://ddragon.leagueoflegends.com/api/versions.json');

  return version.data[0];
};

export const getChampions = async (lang = 'ko_KR') => {
  if (!_.isEmpty(championCache)) {
    console.log('by cache');
    return championCache;
  }

  const version = await getVersion();
  const champions = await Axios.get(`${endpoint}${version}/data/${lang}/champion.json`);
  championCache = champions.data;
  return championCache;
};

export const getChampionByKey = async (key, lang = 'ko_KR') => {
  if (!_.isEmpty(championCacheById)) {
    console.log('by cache by id');
    return championCacheById;
  }

  const champions = await getChampions(lang);
  for (let i in champions.data) {
    const info = champions.data[i];
    championCacheById[info.key] = info;
  }

  return championCacheById[key];
};
