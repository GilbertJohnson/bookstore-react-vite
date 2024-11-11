import React from "react"
import OneCard from "./OneCard"


const BookCard: React.FC<{books:Books[]}> = ({books}) => {
    return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {
        books.map((book) => (
            <OneCard key={book._id } book={book} />
        ))}
    </div>
  )
}

export default BookCard