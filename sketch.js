

var dog,sadDog,happyDog;
var add,remove,f;
var database;

function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database=firebase.database();
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  foodStockRef=database.ref('foodStock');
    foodStockRef.on("value",readStock)
    

  food1=new food()
 
  feed=createButton("Feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)
  

}

function draw() {
  background(46,139,87);
  food1.display();
  drawSprites();
}

//function to read food Stock
function readStock(data){
  f=data.val();
  food1.updateFoodStock(f);
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog)
  if(food1.getFoodStock()>0){
    food1.updateFoodStock(food1.getFoodStock()-1)

  }else{
    food1.updateFoodStock(food1.getFoodStock()*0)
  }
  database.ref('/').update({
    foodStock:food1.getFoodStock()
  })
}

//function to add food in stock
function addFoods(){
f++
database.ref('/').update({
  foodStock:f
})

}

