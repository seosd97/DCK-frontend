import Axios from 'axios';
import _ from 'underscore';

export const getVersion = async () => {
  const version = await Axios.get('https://ddragon.leagueoflegends.com/api/versions.json');

  return version.data[0];
};

export const getGameDatas = async (version, lang = 'ko_KR') => {
  const datas = await Axios.all([
    getChampions(version, lang),
    getSpells(version, lang),
    getRunes(version, lang)
  ]);

  const [champion, spell, rune] = datas;

  return { champion: champion.data, spell: spell.data, rune: rune.data };
};

export const getChampions = (version, lang = 'ko_KR') => {
  return Axios.get(`${process.env.REACT_APP_CDN_ENDPOINT}/${version}/data/${lang}/champion.json`);
};

export const getSpells = (version, lang = 'ko_KR') => {
  return Axios.get(`${process.env.REACT_APP_CDN_ENDPOINT}/${version}/data/${lang}/summoner.json`);
};

export const getRunes = (version, lang = 'ko_KR') => {
  return Axios.get(
    `${process.env.REACT_APP_CDN_ENDPOINT}/${version}/data/${lang}/runesReforged.json`
  );
};
