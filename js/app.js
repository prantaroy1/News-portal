let loadCategories = async () => {
	let url = `https://openapi.programming-hero.com/api/news/categories`;
	try {
		let response = await fetch(url);
		let data = await response.json();
		return data.data.news_category;
	} catch (err) {
		console.log(err);
	}
};

//  Displaying Categories Name---------//

let displayCategories = async () => {
	let categories = await loadCategories();
	let categoriesContainer = document.getElementById('categories-container');
	// categoriesContainer.innerHTML = '';

	categories.forEach((category) => {
		let categoryDiv = document.createElement('div');
		let categoryLink = document.createElement('a');
		categoryDiv.classList.add('cursor-pointer');
		categoryLink.classList.add('link', 'link-hover');
		categoryLink.innerHTML = `
        <div onclick="loadCategoriesDataById('${category.category_id}', '${category.category_name}')">

        ${category.category_name}
           
        </div>
        `;

		categoryDiv.appendChild(categoryLink);
		categoriesContainer.appendChild(categoryDiv);
	});
};
displayCategories();
