/*
	Create memento previewer of the images
*/
function createMementoPreviews(where, buttonOne, buttonTwo) {
	var images = [
		'images/page0.png',
		'images/page1.png',
		'images/page2.png',
		'images/page3.png',
		'images/page4.png',
		'images/page4.png',
		'images/page3.png',
		'images/page2.png',
		'images/page1.png',
		'images/page0.png',
		'images/page1.png',
		'images/page0.png',
		'images/page3.png',
		'images/page2.png',
		'images/page4.png'
	];
	var imageGroup = new drawing.ImageGroup($(where), images);
	var npages = Math.ceil(images.length / 3);
	imageGroup.paginate(npages);
	imageGroup.resize(128);
	$(buttonOne).click(function () {
		imageGroup.previousPage();
	});
	$(buttonTwo).click(function () {
		imageGroup.nextPage();
	});

	someXvalue = [];
	someYvalue = [];
	for (var i = 0; i < 10; ++i)
	{
		someXvalue.push(i);
		someYvalue.push(Math.random() * 10 + 1);
	}

	someXvalue.unshift('x');
	someYvalue.unshift('count');
}