import Cards from '@/components/Card/Cards'
import Link from 'next/link';
import {useEffect , useState } from 'react'
import { API  , Storage } from 'aws-amplify';
import {listBooks} from '../../src/graphql/queries'



const Book =  () => {
  const [data , setData] = useState(null)
  const [loading , setLoading] = useState(false)


  const getItems = async ()=>{
    try {
      setLoading(true)
         // const todos = await API.graphql(graphqlOperation(listSongLists));
         const todos =   await API.graphql({
              query: listBooks,
              authMode: "API_KEY"
            })
          
            const res = todos.data.listBooks.items;

            const booksWithImages = await Promise.all(res.map(async (book) => {
              const imageUrl = await Storage.get(book.bookImage);
              return { ...book, bookImage: imageUrl };
            }));


            setData(booksWithImages)
            setTimeout(() => {
              
              setLoading(false)
            }, 3000);
          
          } catch (error) {
            console.log('You Have No Data' , error)  
          }
        }
        
        


        useEffect(()=>{
          getItems()
          
          
        },[])

if(loading){
  return <div className = 'w-full h-screen flex justify-center items-center' >
    <div className="typewriter">
    <div className="slide"><i></i></div>
    <div className="paper"></div>
    <div className="keyboard"></div>
    </div>
  </div>  
}

  return (
    <div  className='w-full flex justify-center items-center min-h-screen '  >

        <div className='flex justify-center items-center   gap-20 px-10 mt-28 z-0 w-full h-full flex-wrap '  >

{
  data?.map( (val)=>{
    const {  bookImage ,  category , description , price , title , id} = val

    return (
      <Link key = {val.id} href = {`books/${val.id}`} >
        <div  className = '  rounded-lg hover:rounded-0 ' >
        <Cards
        category = {category}
        description = {description}
        image = { bookImage}
        price = {price}
        title = {title}
        id = {id}
        />
        </div>
        </Link>

    )
  })
}
      
  
            
      
        </div>

    </div>
  )
}

export default Book