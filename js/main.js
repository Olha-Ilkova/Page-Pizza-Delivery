const coupon = document.querySelector('.coupon');
const makePizza = document.querySelector('.makePizza');
const couponLink = document.querySelector('.coupon__link');
const makePizzaLink = document.querySelector('.makePizza__link');
const couponCloseBtn = document.querySelector('.coupon__closeBtn');
const makePizzaCloseBtn  = document.querySelector('.makePizza__closeBtn');
const cuponNumberBlock = document.querySelector('.coupon__number');
const orderAddItemBtn = document.querySelectorAll('.order__addItemBtn');
const orderSum = document.querySelector('.order__sum');
const pizzaPrice = document.querySelector('.pizzaPrice');
const orderRemoveItemBtn = document.querySelectorAll('.order__removeItemBtn')
const orderCouponInp = document.querySelector('.order__couponInp');
const orderCupounBtn = document.querySelector('.order__cupounBtn');
let cuponNumber = '';
let orderPrice = 0;
let count = 0;
const container = document.querySelector('.container');
const timeSun = document.querySelector('.time__sun');
const timeMoon = document.querySelector('.time__moon');
let currentTime = new Date().toLocaleTimeString();
let breakPointTime = new Date('2011-10-10T18:00:00').toLocaleTimeString()


timeSun.addEventListener('click',toggleTimeOfDay);
timeMoon.addEventListener('click',toggleTimeOfDay);

function toggleTimeOfDay(){
	count++
	if (count>1) {
		container.classList.add('transition03s')
	}
	
	timeMoon.classList.toggle('hide');
	timeSun.classList.toggle('hide');
	container.classList.toggle('bgWhite');
	container.classList.toggle('bgBlack');

}
makePizzaLink.addEventListener('click', showMakePizzaModal);
couponLink.addEventListener('click', showCouponModal);
makePizzaCloseBtn.addEventListener('click',showMakePizzaModal);
couponCloseBtn.addEventListener('click',showCouponModal);
orderCupounBtn.addEventListener('click', checkDiscount);


function checkDiscount(){
	if(orderCouponInp.value == cuponNumber){
		orderSum.innerText = orderPrice*0.7
	}
}

function showMakePizzaModal(e){
	e.preventDefault()
	makePizza.classList.toggle('hide');
	document.body.classList.toggle('overflowYHidden')
}

function showCouponModal(e){
	e.preventDefault()
	coupon.classList.toggle('hide');
	document.body.classList.toggle('overflowYHidden')
}

for(i=0;i<8;i++){
	cuponNumber+= Math.round(Math.random()*10);
}

cuponNumberBlock.innerText = cuponNumber;

orderAddItemBtn.forEach(function(el){
	el.addEventListener('click', addOrderItem);
})

orderRemoveItemBtn.forEach(function(el){
	el.addEventListener('click', removeOrderItem);
})


function addOrderItem(){
	orderPrice += parseInt(this.previousElementSibling.innerText);
	orderSum.innerText = orderPrice;
}

function removeOrderItem(){
	orderPrice -= parseInt(this.nextElementSibling.innerText);
	orderSum.innerText = orderPrice;
}

if(currentTime>breakPointTime){
	 toggleTimeOfDay()
}



const accordions = document.querySelectorAll('.accordion__item');

accordions.forEach(accordion => {
	accordion.addEventListener('click', setNewTab)
});

function setNewTab(e) {
  const activeAccordion = document.querySelector('.accordion__item--active');
  const accordionItem = e.currentTarget;
  const accordionItemContent = accordionItem.querySelector('.accordion__itemContent');

  if (activeAccordion === accordionItem) {
    activeAccordion.classList.remove('accordion__item--active');
    accordionItemContent.style.height = '0';
    return;
  };

  if (activeAccordion) {
    activeAccordion.classList.remove('accordion__item--active');
    activeAccordion.querySelector('.accordion__itemContent').style.height = '0';
  };

  accordionItem.classList.add('accordion__item--active');
  accordionItemContent.style.height = 'auto';
};



document.addEventListener("DOMContentLoaded", function() {

	const makePizzaForm = document.querySelector(".makePizza");
	const makePizzaBtn = document.getElementById("order__makePizzaBtn");
	const pizzaSizeSelect = document.getElementById("pizzaSize");
	const ingredientsCheckboxes = document.querySelectorAll('input[name="ingredients"]');
	const orderForm = document.querySelector(".order");
	const orderList = document.querySelector(".order__list");
	const totalPrice = document.getElementById("order__totalPrice");
				
	makePizzaBtn.addEventListener("click", function() {
		makePizzaForm.classList.remove("hide");
	});
				
	const closeBtn = document.querySelector(".makePizza__closeBtn");
	closeBtn.addEventListener("click", function() {
		makePizzaForm.classList.add("hide");
	});
				
	function calculatePrice() {
					
					let price = 0;
					const size = pizzaSizeSelect.value;
					
					if (size === "small") {
						price += 8;
					} else if (size === "medium") {
						price += 10;
					} else if (size === "large") {
						price += 12;
					}
					
					ingredientsCheckboxes.forEach(function(checkbox) {
						if (checkbox.checked) {
							price += parseFloat(checkbox.parentElement.lastElementChild.innerText);
						}
					});
					
					const priceElement = document.getElementById("pizzaPrice");
					priceElement.innerText = price.toFixed(2);
	}
				
	pizzaSizeSelect.addEventListener("change", calculatePrice);
	ingredientsCheckboxes.forEach(function(checkbox) {
		checkbox.addEventListener("change", calculatePrice);
	});
				
			
	orderForm.addEventListener("submit", function(event) {
		event.preventDefault();
					
		const size = pizzaSizeSelect.value;
		const ingredients = [];
					
		ingredientsCheckboxes.forEach(function(checkbox) {
			if (checkbox.checked) {
				ingredients.push(checkbox.value);
			}
		});
					
		const price = parseFloat(document.getElementById("pizzaPrice").innerText);
					
		const orderItem = document.createElement("li");
		orderItem.innerText = `${size} Pizza with ${ingredients.join(", ")} - $${price.toFixed(2)}`;
					
				
		orderList.appendChild(orderItem);
					
		
		const currentTotal = parseFloat(totalPrice.innerText);
		totalPrice.innerText = (currentTotal + price).toFixed(2);
					
					
		orderForm.reset();
		makePizzaForm.classList.add("hide");
	});
});


