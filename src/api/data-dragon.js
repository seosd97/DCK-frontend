import Axios from 'axios';
import _ from 'underscore';

const endpoint = 'http://ddragon.leagueoflegends.com/cdn/';

export let championCache = {};
export let championCacheById = {};
export let spellCache = null;
export let runeCache = {};

export const getVersion = async () => {
  const version = await Axios.get('https://ddragon.leagueoflegends.com/api/versions.json');

  return version.data[0];
};

export const getChampions = async (version, lang = 'ko_KR') => {
  const champions = await Axios.get(
    `${process.env.REACT_APP_CDN_ENDPOINT}/${version}/data/${lang}/champion.json`
  );

  return champions.data;
};

export const getChampionByKey = async (key, lang = 'ko_KR') => {
  if (!_.isEmpty(championCacheById)) {
    // console.log('by cache by id');
    return championCacheById[key];
  }

  const champions = await getChampions(lang);
  for (let i in champions.data) {
    const info = champions.data[i];
    championCacheById[info.key] = info;
  }

  return championCacheById[key];
};

export const getSpellByID = async (id, lang = 'ko_KR') => {
  const sid = String(id);
  if (spellCache !== null) {
    return spellCache[sid];
  }

  const version = await getVersion();
  const spells = await Axios.get(
    `http://ddragon.leagueoflegends.com/cdn/${version}/data/${lang}/summoner.json`
  );

  spellCache = {};
  for (let i in spells.data.data) {
    const spell = spells.data.data[i];

    spellCache[spell.key] = spell;
  }

  console.log('load new spell json');
  return spellCache[sid];
};

export const getRuneByID = async (id, lang = 'ko_KR') => {
  if (!_.isEmpty(runeCache)) {
    return runeCache[id];
  }

  const version = await getVersion();
  const runes = await Axios.get(
    `http://ddragon.leagueoflegends.com/cdn/${version}/data/${lang}/runesReforged.json`
  );

  for (let i in runes.data) {
    const rune = runes.data[i];

    runeCache[rune.id] = rune;
  }

  return runeCache[id];
};
