import React, { useState, useEffect } from 'react';
//import './Quotes.css';
import twitterIcon from '../twitter.svg';
import tumblrIcon from '../tumblr.svg';
import speechIcon from '../speaker.png';
import facebookIcon from'../facebook.png';

const Quotes = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
 // const [theme, setTheme] = useState('light');

  useEffect(() => {
    getQuote()
  }, []);

  const getQuote = () => {
    let url = `https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        let dataQuotes = data.quotes;
        let randomNum = Math.floor(Math.random() * dataQuotes.length);
        let randomQuote = dataQuotes[randomNum];

        setQuote(randomQuote.quote);
        setAuthor(randomQuote.author);
      })
  }

  const handleClick = () => {
    getQuote();
    //setTheme(getRandomTheme());
    document.body.style.backgroundColor = getRandomColor();
  }

  const getRandomColor = () => {
    let letters = '89ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }

//   const getRandomTheme = () => {
//     return Math.random() < 0.5 ? 'light' : 'dark';
//   }

  const tweetQuote = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${quote} - ${author}`)}`;
    window.open(tweetUrl, '_blank');
  };

  const tumblrQuote = () => {
    const tumblrUrl = `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${encodeURIComponent(
      author
    )}&content=${encodeURIComponent(quote)}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`;
    window.open(tumblrUrl, '_blank');
  };

  
  const shareOnFacebook = () => {
    const quoteAndAuthor = `${quote} - ${author}`;
    const postUrl = encodeURIComponent(window.location.href);
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${postUrl}&quote=${quoteAndAuthor}`;
    window.open(facebookUrl, '_blank');
  };

  const readQuote = () => {
    const speech = new SpeechSynthesisUtterance(`${quote} - ${author}`);
    speech.lang = 'en-US';
    speechSynthesis.speak(speech);
  };

  return (
    <div>
      <center><h1 className="title">RANDOM QUOTE GENERATOR</h1></center>
      <div id="quote-box" >
        <div id="text"><p>{quote}</p></div>
        <div id="author"><p>{author}</p></div>

        <div id="buttons">
          <div className="social-media">
            <a href="#" id="tweet-quote" onClick={tweetQuote}>
              <span><img src={twitterIcon} alt="Twitter icon" /></span>
            </a>
            <a href="#" id="post-fb" onClick={shareOnFacebook}>
              <span><img src={facebookIcon} alt="Facebook icon" /></span>
            </a>
            <a href="#" id="tumblr-quote" onClick={tumblrQuote}>
              <span><img src={tumblrIcon} alt="Tumblr icon" /></span>
            </a>
          </div>
          <button onClick={handleClick} id="new-quote">New Quote</button>
          <button onClick={readQuote} id="read-quote"><img src={speechIcon} alt=""></img></button>
        </div>
      </div>
    </div>
  )
}

export default Quotes;
