import React from 'react'; 

const Recipe = ({title,url,image}) => {
	return (
		<div>
			<h1>{title}</h1> 
			<a href={url} title={title} target="_blank" rel="noopener noreferrer">
				<img src={image} alt={title} />
			</a>
		</div>		
	);
}

export default Recipe;