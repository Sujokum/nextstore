const stripe = require('stripe')('sk_test_51MtZ9NIIgSkSVy7jEBlGKWXtGv6ovWvh0w4MrZGRjhi99byTi5KB94JQzklCvThFy1MTggbbXRAaiqRzYTsHP7K600lAfAzEIh') 


exports.handler = async (event) => {
    const {typeName, arguments} = event;

    if(typeName !== 'Mutation'){
        throw new Error('Request is not a mutation ;')
    }
    if(!arguments?.productName){
        throw new Error('productName argument is required ;')
    }
    if(!arguments?.price){
        throw new Error('price argument is required ;')
    }
    
    if(!arguments?.quantity){
        throw new Error('quantity argument is required ;')
    }
    
 

    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: arguments.productName,
              },
              unit_amount: arguments.price,
            },
            quantity: arguments.quantity,
          },
        ],
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
