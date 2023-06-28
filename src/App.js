import React, {useEffect, useState} from 'react';
import Recipe from './component/recipe';
import './App.css';

const App = () => {
	const APP_KEY = ''
	
	const [recipes, setRecipes] = useState([])
	const [search, setSearch] = useState("")
	const [query, setQuery] = useState("")
	const [showErrorMsg, setErrorMsg] = useState(false)
	
	useEffect (() => {
		getRecipe()

	}, [query])

	const getRecipe = async () => {
		
		const response = await fetch(`https://forkify-api.herokuapp.com/api/search?key=${APP_KEY}&q=${query}`)
		const data = await response.json()

		if(!data.recipes){
			itemsExist(false)
			setRecipes([])
			return 
		}
		
		itemsExist(true)

		setRecipes(data.recipes)
		
		console.log(data.recipes.length)
	}

	const updateSearch = e => {
		try{
			setSearch(e.target.value)
			console.log(e.target.value + ' update search')
		} catch (e) {
			console.log(e + ' Fail')
		}
		
	}

	const itemsExist = (itemsAvail) => {

		setErrorMsg(itemsAvail)
		
		// console.log('boom! ' + result)
	}

	const getSearch = e => {
		e.preventDefault()
		setQuery(search)
		
		console.log('ping!')
	}

	return (
		<div className="App"> 
			
			<form className="search-form" onSubmit={getSearch}>
				<input onChange={updateSearch} className="search-bar" type="text"/>
				<button className="search-button" type="submit">Search</button>
			</form>

			{ showErrorMsg ? null : <p>No results!</p> }
			
			{recipes.map(recipe =>(
				
				<Recipe 
					key={recipe.title}
					title={recipe.title} 
					url={recipe.source_url} 
					image={recipe.image_url}
				/> 
			))}

		</div>
	);
};

export default App;
