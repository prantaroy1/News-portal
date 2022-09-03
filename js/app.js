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

// loading categories data from https://openapi.programming-hero.com/api/news/category/{category_id}
// loading categories data from https://openapi.programming-hero.com/api/news/category/01

let loadCategoriesDataById = async (id, name) => {
	toggleLoader(true);

	let url = `https://openapi.programming-hero.com/api/news/category/${id}`;

	try {
		let response = await fetch(url);
		let data = await response.json();
		return displayCategoriesNews(data.data, name);
	} catch (err) {
		console.log(err);
	}
};

// displaying news in web page

let displayCategoriesNews = async (news, name) => {
	toggleLoader(true);

	let displayNewsContainer = document.getElementById('display-news-container');
	displayNewsContainer.innerHTML = '';

	// total number of news available for each categories

	let totalNumberOfNews = document.getElementById('total-categories-item');
	totalNumberOfNews.innerHTML = `
    <div class="p-3 my-10">
    ${news.length} items available in ${name} category
    </div>
    `;

	// sorting views
	news.sort((a, b) => b.total_view - a.total_view);

	news.forEach((newsItem) => {
		let newsDiv = document.createElement('div');
		newsDiv.innerHTML = `
	        <div class="card flex sm:flex-row p-4 bg-white shadow-xl my-5 hover:shadow-sky-600 hover:duration-150 mb-10 ">
	            <figure><img src="${
							newsItem.thumbnail_url
							}" alt="Album" style="width: 100%; height: 100%;"></figure>
	            <div class="card-body">
	            <h2 class="card-title text-black font-bold text-2xl">${newsItem.title}</h2>
	            <p>${
					newsItem.details.length > 20
					? newsItem.details.slice(0, 200) + '...'
					: newsItem.details
					}
	                </p>
	            <p>${
					newsItem.details.length > 20
					? newsItem.details.slice(201, 400) + '...'
					: newsItem.details
					}
	                </p>

	                <div class="grid grid-cols-1 sm:grid-cols-3 items-center text-center mt-3">

	                    <div class="flex justify-center gap-5 items-center">
	                        <div>
	                        <img src=" ${newsItem.author.img}" class="w-10 rounded-full">
	                        </div>
	                        <div>
	                        <h1>${
								newsItem.author.name === null
								? 'Author Not found'
								: newsItem.author.name === ''
							    ? 'Author Not found'
							    : newsItem.author.name
					            }
                            </h1>
	                        </div>
	                    </div>

	                    <div class="flex gap-2 justify-center items-center" >

							<div>
							<i class="fa-solid fa-eye"></i>
							</div>

	                        <div>
							<h1 class="font-bold text-black text-lg">${
								newsItem.total_view ? newsItem.total_view + 'M' : 'Total View Not Found'
							}</h1>
							
							</div>
	                    </div>

	                    <div onclick="newModalNewDetail('${newsItem._id}')">
                        <label for="my-modal-3" class="btn modal-button btn-outline btn-accent px-10  py-2">Read More</label>
	                    </div>

	                </div>

	            </div>
	        </div>
	        `;
		displayNewsContainer.appendChild(newsDiv);
		toggleLoader(false);
	});
};
