// @ts-nocheck
import React from 'react';
import axios from 'axios';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import russia from './assets/russia.png'
import usa from './assets/united-states.png'
import germany from './assets/germany.png'
import france from './assets/france.png'
import spain from './assets/spain.jpg'
import portugal from './assets/portugal.jpg'
import italy from './assets/italy.jpg'
import cz from './assets/cz.png'
import button from './assets/refresh-button.png'
import './styles/links.css'
import './styles/buttondata.scss'
import Radio from '@mui/material/Radio';
import { motion } from 'framer-motion/dist/framer-motion'



function App() {

	let [responseData, setResponseData] = React.useState('');

	// const [language, setLanguage] = React.useState(['en'])
	const saved = localStorage.getItem("language");
	const initialValue = JSON.parse(saved) || 'en';


	const [language, setLanguage] = React.useState(initialValue || 'en');




	localStorage.setItem("language", JSON.stringify(language));


	// console.log(language)

	const handleChange = (event: any) => {
		setLanguage(event.target.value);
		// @ts-ignore
		window.location.reload(true);
	};

	const controlProps = (item: any) => ({
		checked: language === item,
		onChange: handleChange,
		value: item,
		name: 'color-radio-button-demo',
		inputProps: { 'aria-label': item },

	});


	interface quotesTypes {
		content: string,
		originator: string
	}


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
	}, [language])

	React.useEffect(() => {
		fetchData()
	}, [fetchData])





	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: -180 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					ease: "easeInOut",
					duration: 1,
					delay: 0,
				}}
			>
				<AppBar position="static" color='warning'>
					<Toolbar>

						<Typography variant="h4" style={{ fontWeight: '600' }} component="div" sx={{ flexGrow: 1 }}>
							Komoquote ණ
						</Typography>
						<div className='flags'>
							<img src={usa} style={{ width: '30px' }} alt='usa' />
							<Radio {...controlProps('en')} />
							<img src={russia} style={{ width: '30px' }} alt='russia' />
							<Radio {...controlProps('ru')} color="secondary" />
							<img src={germany} style={{ width: '30px' }} alt='ger' />
							<Radio {...controlProps('de')} color="success" />
							<img src={france} style={{ width: '30px' }} alt='fra' />
							<Radio {...controlProps('fr')} color="default" />

							<br />
							<img src={spain} style={{ width: '30px' }} alt='spa' />
							<Radio {...controlProps('es')} color="default" />
							<img src={portugal} style={{ width: '30px' }} alt='port' />
							<Radio {...controlProps('pt')} color="default" />
							<img src={italy} style={{ width: '30px' }} alt='ita' />
							<Radio {...controlProps('it')} color="default" />
							<img src={cz} style={{ width: '30px' }} alt='cz' />
							<Radio {...controlProps('cs')} color="default" />
						</div>
					</Toolbar>
				</AppBar>

			</motion.div>

			<div className="App">


				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						ease: "easeInOut",
						duration: 1,
						delay: 1,
					}}
				>
					<header className="App-header">
						<h1>
							↧
						</h1>
						<button className='buttondata' type='button' onClick={fetchData}><img src={button} style={{ width: '50px' }} alt='button' /></button>

					</header>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, x: -180 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{
						ease: "easeInOut",
						duration: 1,
						delay: 0.5,
					}}
				>
					<main>
						{responseData &&
							<blockquote>

								“{responseData.content}”
								<small><a href={responseData.originator.url} style={{ textDecoration: 'none', color: 'white', fontWeight: '600' }}>{responseData.originator.name}<span role='img' aria-label='lamp'>💡</span></a></small>
							</blockquote>
						}
					</main>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, x: -180 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{
						ease: "easeInOut",
						duration: 1,
						delay: 1,
					}}
				>
					<footer className='footer' style={{ marginBottom: '5%' }}>
						<div className="wrapper">
							<a href='https://www.t.me/KomarIvan' style={{ color: 'orange' }}>
								<div className="icon facebook">
									<div className="tooltip">Telegram</div>
									<span><i className="fab fa-telegram"></i></span>
								</div>
							</a>
							<a href='https://twitter.com/KomaHuman' style={{ color: 'orange' }}>
								<div className="icon twitter">
									<div className="tooltip">Twitter</div>
									<span><i className="fab fa-twitter"></i></span>
								</div>
							</a>
							<a href='https://github.com/Ivan-Corporation' style={{ color: 'orange' }}>
								<div className="icon github">
									<div className="tooltip">Github</div>
									<span><i className="fab fa-github"></i></span>
								</div>
							</a>
							<a href='https://www.youtube.com/channel/UCWj8NJUnyji2xHHThU1TTsw' style={{ color: 'orange' }}>
								<div className="icon youtube">
									<div className="tooltip">Youtube</div>
									<span><i className="fab fa-youtube"></i></span>
								</div>
							</a>
						</div>
					</footer>
				</motion.div>
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