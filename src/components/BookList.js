import React from "react";
import BookCard from "./BookCard";

const BookList =(props) => {
             return(
                 <div className="container">
                     <div className="row mt-2">
                         {
                             props.book.map((book)=><BookCard  info={book} id={book}/>)
                         }
                     </div>
                 </div>
             )
}
export default BookList