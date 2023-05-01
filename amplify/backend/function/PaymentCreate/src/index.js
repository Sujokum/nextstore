const stripe = require('stripe')('sk_test_51MtZ9NIIgSkSVy7jEBlGKWXtGv6ovWvh0w4MrZGRjhi99byTi5KB94JQzklCvThFy1MTggbbXRAaiqRzYTsHP7K600lAfAzEIh') 


exports.handler = async (event) => {
    const {typeName} = event;
    const {  items } = event.arguments.input;

    if(typeName !== 'Mutation'){
        throw new Error('Request is not a mutation ;')
    }
    console.log('Items' ,  items)
  
   const cartData = items?.map((item)=>{
      console.log(item.title)
    return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images : [item.bookImage],
            description : item.description,
            metadata : {
              id : item.id
            }
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      }
    
   }) 
 console.log('CartItems' ,  cartData)

    const session = await stripe.checkout.sessions.create({
        line_items:  cartData
        ,
        mode: 'payment',
        success_url: 'http://localhost:3000/',
        cancel_url: 'http://localhost:3000/',
      });
      
      console.log(session.url)




    return {
        statusCode: 200,
        clientSecret : session.url,
    };
};
