import React, {useCallback} from 'react';
import axios from 'axios';
import './App.css';
import Switch from '@mui/material/Switch';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import russia from './assets/russia.png'
import usa from './assets/united-states.png'
import germany from './assets/germany.png'
import france from './assets/france.png'
import button from './assets/refresh-button.png'
import './styles/links.css'
import './styles/buttondata.scss'
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';


function App() {
  let [responseData, setResponseData] = React.useState('');

  // const [language, setLanguage] = React.useState(['en'])
  const saved = localStorage.getItem("language");
  const initialValue = JSON.parse(saved) || 'en';

  
  const [language, setLanguage] = React.useState(initialValue || 'en');

  
  

  localStorage.setItem("language", JSON.stringify(language));


  console.log(language)

  const handleChange = (event) => {
    setLanguage(event.target.value);
    window.location.reload(true);
  };

  const controlProps = (item) => ({
    checked: language === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
    
  });

 

  const fetchData = React.useCallback(() => {
    axios({
      "method": "GET",
      "url": "https://quotes15.p.rapidapi.com/quotes/random/",
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "quotes15.p.rapidapi.com",
        "x-rapidapi-key": 'c232c6ccd4msh0bcf1216baa6af8p1baf68jsnf2c8ea66b4db'
      }, "params": {
        "language_code": `${language}`
      }
    })
    .then((response) => {
      setResponseData(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  
  


  return (
    <>
    <AppBar position="static" color="warning">
        <Toolbar>
    
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Komoquote ණ
          </Typography>
            <div className='flags'>
               <img src={usa} style={{width:'30px'}}/>
                <Radio {...controlProps('en')} />
                <img src={russia} style={{width:'30px'}}/>
                <Radio {...controlProps('ru')} color="secondary" />
                <img src={germany} style={{width:'30px'}}/>
                <Radio {...controlProps('de')} color="success" />
                <img src={france} style={{width:'30px'}}/>
                <Radio {...controlProps('fr')} color="default" />
                
              
              </div>
              </Toolbar>
      </AppBar>
    

   
    <div className="App">
 
 
 
      <header className="App-header">
        <h1>
        ↧
        </h1>
        <button className='buttondata' type='button' onClick={fetchData}><img src={button} style={{width:'50px'}}/></button>
    
      </header>
      <main>
        {responseData &&
          <blockquote>
            “{responseData && responseData.content}”
            <small>{responseData && responseData.originator && responseData.originator.name}💡</small>
          </blockquote> 
        }
        </main>
        <footer className='footer'>
          <div className="wrapper">
          <a href='https://www.t.me/KomarIvan' style={{color:'orange'}}>
          <div className="icon facebook">
            <div className="tooltip">Telegram</div>
            <span><i className="fab fa-telegram"></i></span>
          </div>
          </a>
          <a href='https://twitter.com/KomaHuman' style={{color:'orange'}}>
          <div className="icon twitter">
            <div className="tooltip">Twitter</div>
            <span><i className="fab fa-twitter"></i></span>
          </div>
          </a>
          <a href='https://github.com/Ivan-Corporation' style={{color:'orange'}}>
          <div className="icon github">
            <div className="tooltip">Github</div>
            <span><i className="fab fa-github"></i></span>
          </div>
          </a>
          <a href='https://www.youtube.com/channel/UCWj8NJUnyji2xHHThU1TTsw' style={{color:'orange'}}>
          <div className="icon youtube">
            <div className="tooltip">Youtube</div>
            <span><i className="fab fa-youtube"></i></span>
          </div>
          </a>
        </div>
        </footer>

      {/* <pre>
        <code>
          {responseData && JSON.stringify(responseData, null, 4)}
        </code>
      </pre> */}
    </div>
    </>
  );
}

export default App;