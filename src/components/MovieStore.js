import React, {  useState } from 'react'


function MovieStore() {
   
    const [text, setText] = useState('')
    const [movie, setMovie] = useState([]);
    const [isError , setIsError] = useState({
        show : 'false',
        msg : "",

    })
    const [isLoading, setIsLoading] = useState(false)

    // handling on click function
    const fetchData = async()=>{
        
        setIsLoading(true);
        if(text.trim() === ''){
            setIsLoading(false);
            return;
        }
        try {
            const response = await fetch(`http://www.omdbapi.com/?apikey=bb19e076&s=${text}`) ;
            const data  = await response.json();
            console.log(data)
            setIsLoading(false)
            if(data.Response === "True"){
                
                console.log(data.Search)
                setMovie(data.Search);
            }
            else{
                setIsLoading(false)
                setIsError({
                    show:true,
                    msg:data.error,
                });
            }
        } catch (error) {
            console.log('error')
        }
    }


    return (
        <>
        <div className='navbarContainer'>
            <div className="navbar">
                <input type="search"
                    className='searchBar'
                    onChange={(e)=>setText(e.target.value)}
                    value={text}
                    placeholder='Movie name'
                />
                <button className='searchbtn' onClick={fetchData}>
                    Search
                </button>
            </div>
        </div>
        <section className='displayMovies'>
            <div className="card-error">
                <p>{ isError.show && isError.msg}</p>
            </div>
            <div className="card-loading">
                {isLoading && (
                    <p>Loading.....</p>
                )}
            </div>
            <div className="card-container">
            {movie.map((currMovie , index) => {
                return ( 
                    <div className="card" key={index}>
                        <img src={currMovie.Poster} className="card-img-top" alt={currMovie.Title}/>
                        <div className="card-body">
                            <h5 className="card-title">{currMovie.Title}</h5>
                            <p className="card-text">Year : { currMovie.Year } </p>
                            <p className="card-text">Type : { currMovie.Type } </p>
                        </div>
                  </div>
                    
                )
            })}
            </div>
        </section>
        
        </>
    )
}

export default MovieStore
