import React, {useEffect, useState} from 'react';
import Recipe from './component/recipe';
import './App.css';

const App = () => {
	const APP_KEY = '48ec59b90415bf89982c9055b5a84d5d';
	
	const [recipes, setRecipes] = useState([]);
	const [search, setSearch] = useState("");
	const [query, setQuery] = useState("");
	
	useEffect (() => {
		getRecipe();
	}, [query]);

	const getRecipe = async () => {
		const response = await fetch(`https://www.food2fork.com/api/search?key=${APP_KEY}&q=${query}`);
		const data = await response.json();
		setRecipes(data.recipes);
		console.log(data);
	};

	const updateSearch = e => {
		try{
			setSearch(e.target.value);
			console.log(e.target.value + ' Success');
		} catch (e) {
			console.log(e + ' Fail');
		}
		
	};

	const getSearch = e => {
		e.preventDefault();
		setQuery(search);
		console.log('getSearch success!');
	};

	return (
		<div className="App"> 
			
			<form className="search-form" onSubmit={getSearch}>
				<input onChange={updateSearch} className="search-bar" type="text"/>
				<button className="search-button" type="submit">Search</button>
			</form>
			
			{recipes.map(recipe =>(
				<Recipe 
					key={recipe.title}
					title={recipe.title} 
					url={recipe.source_url} 
					image={recipe.image_url}
				/>
			))};
		</div>
	);
};

export default App;
