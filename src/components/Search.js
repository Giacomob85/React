import React, {useState} from "react";
import axios from 'axios';
import BookList from "./BookList";
import {Spinner} from 'reactstrap';
const Search =()=>  {
        const [bookName, setBookName]=useState('');
        const [books, setBooks] = useState([]);
        const [maxResult, setMaxResult] = useState(15);
        const [loading, setLoading] = useState(false);
        const KEY = process.env.REACT_APP_API_KEY
        const Max_Results=maxResult
        const API_URL =`https://www.googleapis.com/books/v1/volumes?q=${bookName}&maxResults=${Max_Results}&key=${KEY}`;


        // FUNCTION ASSIGN BOOK NAME
        function book(e) {
            setBookName(e.target.value)
        }

         const verifInputAndSearchBook=()=>{

        if (bookName<1){
            document.getElementById('errorTitle').innerText='Set Book Name'
        }
        else if (!(bookName<2)){
            document.getElementById('errorTitle').innerText=''
            searchBooks()
            setLoading(true)

        }

    }     //FUNCTION FOR MANAGING THE NUMBER OF RESULTS TO BE RETURNED

         const maxResults =(result)=>{
            // CONDITION FOR VERIFY THE INPUT

            if (result.target.value===''){
                document.getElementById('errorResult').innerText='Set the max results'


            }
            if (!(result.target.value==='')){
                document.getElementById('errorResult').innerText=''
            }
            if (result.target.value > 40 || result.target.value <=0){
                document.getElementById('errorResult').innerText='Give a number less than 40 Please ! '

            }else{
                document.getElementById('errorResult').innerText='';
            }
            setMaxResult(result.target.value);

        }
         //Function control spinner

            function stopSpiner() {
               setLoading(false)
           }
        //Function Search Book
        function searchBooks(){

         axios
            .get(API_URL)
            .then((res) => setBooks([...res.data.items]))
            .then(stopSpiner)
            .catch(err=>{
                console.log(err)
            })

         }
          // CONDITION DISPLAY SPINNER OR BOOKLIST

         const render = loading?<div className='d-flex justify-content-center mt-3'>
             <Spinner style={{ width: '3rem', height: '3rem' }} />
         </div>:  <div>
             <BookList book={books}/>
             <div className="container">
                 <hr className="" style={{color:"white"}}/>
                 <div className="row">
                     <div className="col-12 d-flex justify-content-center">
            
            <a href="https://www.youtube.com/watch?v=4UQanBPPw_U">ITALIAN'S DO IT BETTER</a>
                     </div>
                 </div>
             </div>
         </div> ;

     //******RETURNED VALUE FUNCTION SEARCH.JS*******//

         return(
               <div>
                    <div className="container-fluid mt-2 mx-xs-0">
                        <div id="background" >
                            <div className="row">
                                <div className="col-12 text-white d-flex justify-content-center mt-3">
                                    <h1 className=" mt-1 col-xs-5 rounded"><span id="title">Bookaneer <i className="fa fa-beer" aria-hidden="true"> </i></span></h1>
                                </div>
                            </div>
                            <div className="row mt-3 d-flex justify-content-center ">
                                <div className="col-4 d-flex justify-content-center ">
                                        <input  className=" form-control m-4 text-center"
                                                value={bookName}  onChange={book} onKeyUp={verifInputAndSearchBook}
                                        placeholder="search"/>
                                </div>
                            </div>

                        </div>
                        <div className="row rounded mt-3">
                            <div className="col-12 d-flex justify-content-center">
                                <input type="number" id="MaxResult" className="text-center form-control px-1 col-1" placeholder="Max Result"  value={maxResult} onChange={maxResults}
                                onKeyUp={verifInputAndSearchBook} style={{minWidth:"50px"}}/>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col d-flex justify-content-center">
                                <div className="d-flex flex-column">
                                    <h2 id="errorType"> </h2>
                                    <h2 id="errorResult"> </h2>
                                    <h2 id="errorTitle"> </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                   {/*----------DISPLAY SPINNER OR BOOKLIST----------*/}
                                     {render}

               </div>

         )
  }

export default Search