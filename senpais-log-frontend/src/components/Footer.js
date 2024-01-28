// Footer.js
import React from 'react';
import linkedinIcon from '../img/linkedin-light.svg';
import twitchIcon from '../img/twitch.svg';
import twitterIcon from '../img/twitter-light.svg';
import githubIcon from '../img/github-light.svg';
import instagramIcon from '../img/instagram-light.svg';
import discordIcon from '../img/discord.svg';

function Footer() {
  return (
    <footer className="footer" id="footer">
      <h6>CONNECT with ME :</h6>
      <p align="left">
        <a
          href="https://www.linkedin.com/in/janymuong/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img align="center" src={linkedinIcon} title="LinkedIn" alt="@janymuong" />
        </a>
        <a href="https://www.twitch.tv/janymuong/" target="_blank" rel="noopener noreferrer">
          <img align="center" src={twitchIcon} title="Twitch" alt="@janymuong" />
        </a>
        <a href="https://twitter.com/janymuong/" target="_blank" rel="noopener noreferrer">
          <img align="center" src={twitterIcon} title="Twitter" alt="janymuong" />
        </a>
        <a href="https://github.com/janymuong/" target="_blank" rel="noopener noreferrer">
          <img align="center" src={githubIcon} title="GitHub" alt="@janymuong" />
        </a>
        <a
          href="https://instagram.com/jany_muong/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img align="center" src={instagramIcon} title="Instagram" alt="@janymuong" />
        </a>
        <code>
          <a href="https://discord.com/janymuong#0/" target="_blank" rel="noopener noreferrer">
            <img align="center" src={discordIcon} title="Discord" alt="@janymuong" />
          </a>
        </code>
      </p>
      <div className="copyright">
        &copy; {new Date().getFullYear()} World Wide 'WEEB' ウィアブー. Unlicense. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
