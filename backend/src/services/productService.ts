
import { productModel } from "../models/productModel";

// get all  products

 export const getAllProducts  = async () => {
    return await productModel.find();
}

// insert products 
export const seedInitailProducts = async () => {
    // product  list 
 try{
       const products = [
  {
    "title": "Macbook Pro",
    "image": "https://5.imimg.com/data5/SELLER/Default/2021/11/JO/DF/OI/74357280/apple-macbook-pro-500x500.jpg",
    "price": 35000,
    "stock": 5
  },
  {
    "title": "Dell XPS 13",
    "image": "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-13-9300/global-spi/ng/silver/notebook-xps-13-9300-silver-campaign-hero-504x350-ng.psd?fmt=jpg&wid=570&hei=400",
    "price": 27000,
    "stock": 8
  },
  {
    "title": "HP Spectre x360",
    "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.wired.com%2Freview%2Fhp-spectre-x360-convertible-laptop-2018%2F&psig=AOvVaw2u1Gd6aD6TPsc7F63EFXI4&ust=1760632277497000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNinsL7QppADFQAAAAAdAAAAABAL",
    "price": 25000,
    "stock": 6
  },
  {
    "title": "Lenovo ThinkPad X1",
    "image": "https://p3-ofp.static.pub//fes/cms/2024/02/05/caqs1cskxq1zogc2bvou8lblvwuf09813272.jpg",
    "price": 30000,
    "stock": 4
  },
  {
    "title": "Asus ZenBook 14",
    "image": "https://dlcdnwebimgs.asus.com/gain/c08fbbb1-f8f7-4b42-a969-52dfe6957db9/w800",
    "price": 22000,
    "stock": 10
  },
  {
    "title": "Acer Swift 3",
    "image": "https://reimg-teknosa-cloud-prod.mncdn.com/mnresize/600/600/productimage/786280760/786280760_2_MC/f0b026db76c64880ae5d214a11ca92f9.jpg",
    "price": 18000,
    "stock": 12
  },
  {
    "title": "Microsoft Surface Laptop 5",
    "image": "https://microless.com/cdn/products/9703a5a3a79e6b5b087019a89de116e4-hi.jpg",
    "price": 32000,
    "stock": 7
  },
  {
    "title": "Razer Blade 15",
    "image": "https://m.media-amazon.com/images/I/51bYk7yY+dL.jpg",
    "price": 40000,
    "stock": 3
  },
  {
    "title": "LG Gram 17",
    "image": "https://media.us.lg.com/transform/ecomm-PDPGallery-1100x730/2f01e0dc-11a9-461b-af00-a7ccd6508ede/md07500001-DZ-001-jpg?io=transform:fill,width:1536",
    "price": 28000,
    "stock": 5
  },
  {
    "title": "Samsung Galaxy Book 3",
    "image": "https://m.media-amazon.com/images/I/610GqAXKymL._UF1000,1000_QL80_.jpg",
    "price": 26000,
    "stock": 6
  }
]


    const  existingProducts = await getAllProducts();
    if(existingProducts.length === 0){
        await productModel.insertMany(products);
    }
 }catch(err){
   console.error("cannor see database", err);
 }
}
