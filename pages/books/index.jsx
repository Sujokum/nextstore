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
    <div  className='w-full h-full pb-10 '  >
        <svg  xmlns='http://www.w3.org/2000/svg'  width='361' height='361' viewBox='0 0 200 200'><rect fill='#FBFBFB' width='200' height='200'/><defs><linearGradient id='a' gradientUnits='userSpaceOnUse' x1='88' y1='88' x2='0' y2='0'><stop  offset='0' stopColor='#000d18'/><stop  offset='1' stopColor='#00121b'/></linearGradient><linearGradient id='b' gradientUnits='userSpaceOnUse' x1='75' y1='76' x2='168' y2='160'><stop  offset='0' stopColor='#828282'/><stop  offset='0.09' stopColor='#a6a6a6'/><stop  offset='0.18' stopColor='#bebebe'/><stop  offset='0.31' stopColor='#d0d0d0'/><stop  offset='0.44' stopColor='#dedede'/><stop  offset='0.59' stopColor='#e9e9e9'/><stop  offset='0.75' stopColor='#f1f1f1'/><stop  offset='1' stopColor='#F7F7F7'/></linearGradient><filter id='c' x='0' y='0' width='200%' height='200%'><feGaussianBlur in='SourceGraphic' stdDeviation='12' /></filter></defs><polygon fill='url(#a)' points='0 174 0 0 174 0'/><path fill='#000' fillOpacity='0.03' filter='url(#c)' d='M121.8 174C59.2 153.1 0 174 0 174s63.5-73.8 87-94c24.4-20.9 87-80 87-80S107.9 104.4 121.8 174z'/><path fill='url(#b)' d='M142.7 142.7C59.2 142.7 0 174 0 174s42-66.3 74.9-99.3S174 0 174 0S142.7 62.6 142.7 142.7z'/></svg>

        <div className='flex  justify-start left-60 gap-20 px-10 pb-5 flex-wrap absolute  top-36'  >

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