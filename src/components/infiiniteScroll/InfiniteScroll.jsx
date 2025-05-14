import React, { useEffect, useState } from 'react'
import './InfiniteScroll.css'

const InfiniteScroll = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const getUsersFromAPI = () => {
        setIsLoading(false);
        fetch(`https://api.github.com/users?since=${(page - 1) * 30}`).then((response) => response.json()).then((data) => {
            setUsers((prevUsers) => [...prevUsers, ...data]);
            setPage((prevPage) => prevPage + 1);
            setIsLoading(false);
        }).catch(error => {
            console.error(`Error while fetching users: ${error}`);
            setIsLoading(false);
        });
    }


    // function to check scroll position and load more if needed
    const handleScroll = () => {
        if(isLoading) return;

        if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
            getUsersFromAPI();
        }
    }

    // Initial load and attach scroll listener
    useEffect(() => {
        getUsersFromAPI();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    
    return (
        <>
            <h1>Github Users</h1>
            {/* {users.map(user => (
                <div key={user.id}>
                    <p>{user.login}</p>
                    <img src={user.avatar_url} alt={user.login} />
                    <h3>{user.login}</h3>
                    <a href={user.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
                </div>
            ))} */}

            <section>
                <div className="container">
                    {users.map((user) => (
                        <div className="card" key={user.id}>
                            <div className="image-container">
                                <img src={user.avatar_url} alt={user.login} />
                            </div>

                            <div className="content-container">
                                <div className="contentBx">
                                    <h3>
                                        {user.login}<br/>
                                        <span>{user.type}</span>
                                    </h3>
                                </div>
                                <div className="sci">
                                    <a href={user.html_url} target='blank' rel='noopener noreferrer'>View Profile</a>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </section>

        </>
    )
}

export default InfiniteScroll