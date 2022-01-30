import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const UpdateBookInfo = (props) => {
    const [bookData, setBookData] = useState(Array(6).fill({
        title: '',
        isbn: '',
        author: '',
        description: '',
        published_date: '',
        publisher: ''
    }));
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const ac = new AbortController();
        axios
            .get('http://localhost:8082/api/books/' + params.id)
            .then(res => {
                setBookData({
                    title: res.data.title,
                    isbn: res.data.isbn,
                    author: res.data.author,
                    description: res.data.description,
                    published_date: res.data.published_date,
                    publisher: res.data.publisher
                })
            })
            .catch(err => {
                console.log("Error from UpdateBookInfo");
            })
            return () => ac.abort(); 
    }, [setBookData, params]);

    const onChange = e => {
        setBookData({ ...bookData, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();

        axios
            .put('http://localhost:8082/api/books/' + params.id, bookData)
            .then(res => {
                navigate('/show-book/' + params.id);
            })
            .catch(err => {
                console.log("Error in UpdateBookInfo!");
                console.log(err);
            })
    };

    return (
        <div className='UpdateBookInfo'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 m-auto'>
                        <br />
                        <Link to='/' className="btn btn-outline-warning float-left">
                            Show BooK List
                        </Link>
                    </div>
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Edit Book</h1>
                        <p className="lead text-center">
                            Update Book's Info
                        </p>
                    </div>
                </div>

                <div className="col-md-8 m-auto">
                    <form noValidate onSubmit={onSubmit}>
                        <div className='form-group'>
                            <label htmlFor="title">Title</label>
                            <input
                                type='text'
                                placeholder='Title of the Book'
                                name='title'
                                className='form-control'
                                value={bookData.title}
                                onChange={onChange}
                            />
                        </div>
                        <br />

                        <div className='form-group'>
                            <label htmlFor="isbn">ISBN</label>
                            <input
                                type='text'
                                placeholder='ISBN'
                                name='isbn'
                                className='form-control'
                                value={bookData.isbn}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="author">Author</label>
                            <input
                                type='text'
                                placeholder='Author'
                                name='author'
                                className='form-control'
                                value={bookData.author}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="description">Description</label>
                            <input
                                type='text'
                                placeholder='Describe this book'
                                name='description'
                                className='form-control'
                                value={bookData.description}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor="published_date">Published Date</label>
                            <input
                                type='date'
                                placeholder='published_date'
                                name='published_date'
                                className='form-control'
                                value={bookData.published_date}
                                onChange={onChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="publisher">Publisher</label>
                            <input
                                type='text'
                                placeholder='Publisher of this Book'
                                name='publisher'
                                className='form-control'
                                value={bookData.publisher}
                                onChange={onChange}
                            />
                        </div>

                        <button type='submit' className="btn btn-outline-info btn-lg btn-block">Update Book</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateBookInfo;