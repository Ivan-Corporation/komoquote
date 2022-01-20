import React from 'react';
import axios from 'axios';
import './App.css';
import Switch from '@mui/material/Switch';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import russia from './assets/russia.png'
import usa from './assets/united-states.png'
import './styles/links.css'
import './styles/buttondata.scss'

function App() {
  let [responseData, setResponseData] = React.useState('');
  let [language, setLanguage] = React.useState('en');


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


  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
    <AppBar position="static" color="warning">
        <Toolbar>
    
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Komoquote ණ
          </Typography>
               <img src={usa} style={{width:'30px'}}/>
               <Switch
            checked={checked}
            onChange={handleChange}
            color="primary"
                
            inputProps={{ 'aria-label': 'controlled' }}
          /> 
          <img src={russia} style={{width:'30px'}}/>
              </Toolbar>
      </AppBar>
    

   
    <div className="App">
 
 
 
      <header className="App-header">
        <h1>
          Fetching Data with React Hooks
        </h1>
        <button className='buttondata' type='button' onClick={fetchData}>Click for Data</button>
    
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
          <div class="wrapper">
          <div class="icon facebook">
            <div class="tooltip">Facebook</div>
            <span><i class="fab fa-facebook-f"></i></span>
          </div>
          <div class="icon twitter">
            <div class="tooltip">Twitter</div>
            <span><i class="fab fa-twitter"></i></span>
          </div>
          <div class="icon instagram">
            <div class="tooltip">Instagram</div>
            <span><i class="fab fa-instagram"></i></span>
          </div>
          <div class="icon github">
            <div class="tooltip">Github</div>
            <span><i class="fab fa-github"></i></span>
          </div>
          <div class="icon youtube">
            <div class="tooltip">Youtube</div>
            <span><i class="fab fa-youtube"></i></span>
          </div>
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