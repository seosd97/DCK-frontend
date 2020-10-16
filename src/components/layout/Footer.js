import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <footer className="flex-col flex-j-c flex-align-c width-100">
      <p>
        Contact us by <a href="mailto:seosd97@gmail.com">e-mail</a>
      </p>
      <p>Copyright (c) 2020 SeungDuk Seo</p>
      <div id="social-links" className="flex-row flex-align-c">
        <a href="https://www.youtube.com/user/cjwsc0410" target="_blank" rel="noopener noreferrer">
          <img
            src={`${process.env.PUBLIC_URL}/icons/youtube_icon_white.png`}
            alt="social_link_youtube"
          ></img>
        </a>
        <a href="https://discord.gg/EJwBRjN" target="_blank" rel="noopener noreferrer">
          <img
            src={`${process.env.PUBLIC_URL}/icons/discord_icon_white.png`}
            alt="social_link_dicord"
          ></img>
        </a>
        <a href="https://github.com/seosd97/DCK-frontend" target="_blank" rel="noopener noreferrer">
          <img
            src={`${process.env.PUBLIC_URL}/icons/github_icon_white.png`}
            alt="social_link_github"
          ></img>
        </a>
      </div>
    </footer>
  );
};
