import React, { useEffect, useState } from 'react'
import './InfiniteScroll.css'

const InfiniteScroll = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const getUsersFromAPI = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`https://api.github.com/users?since=${(page - 1) * 30}`);
            const data = await response.json();
            setUsers((prevUsers) => [...prevUsers, ...data]);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error(`Error while fetching users: ${error}`);
        } finally {
            setIsLoading(false);
        }
    }

    // function to check scroll position and load more if needed
    const handleScroll = () => {
        if (isLoading) return;

        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
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
            <h1 className='page-title'>Github Users</h1>
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
                                        {user.login}<br />
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