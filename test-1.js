// polyfill
Number.isInteger = Number.isInteger || function(value) {
	return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
};

function PaginationHelper(collection, itemsPerPage) {
	
	if (!(this instanceof arguments.callee)) {
		return new arguments.callee(collection, itemsPerPage);
	}
	
	// Проверка аргументов
	if (!(collection instanceof Array) && !(Number.isInteger(itemsPerPage) && itemsPerPage > 0)) {
		throw Error('invalid argument');
	}
	
	var
		itemCount = collection.length,
		pageCount = Math.ceil(itemCount/itemsPerPage);
	
	this.itemCount = function () {
		return itemCount;
	};
	
	this.pageCount = function () {
		return pageCount;
	};
	
	this.pageItemCount = function (pageIndex) {
		// Несуществующие 
		if (pageIndex < 0 || (pageIndex+1) > pageCount) {
			return -1;
		}
		
		if ((pageIndex+1) < pageCount) {
			return itemsPerPage;
		}
		else { // last page
			return itemCount - pageIndex*itemsPerPage;
		}
	};
	
	this.pageIndex = function (itemIndex) {
		if (itemIndex < 1 || itemIndex > itemCount) {
			return -1;
		}
		return Math.ceil(itemIndex/itemsPerPage) - 1;
	};
}

// Использование
var helper	= PaginationHelper(['a', 'b', 'c', 'd', 'e', 'f'], 4);
var helper2	= new PaginationHelper(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 2);

console.log(helper.itemCount()); // 6
console.log(helper.pageCount()); // 2
console.log(helper.pageItemCount(1)); // 2
console.log(helper.pageIndex(4)); // 0

console.log(helper2.itemCount()); // 7
console.log(helper2.pageCount()); // 4
console.log(helper2.pageItemCount(3)); // 1
console.log(helper2.pageIndex(0)); // -1
