import React, { useEffect, useState } from 'react'
import RequestHistoryCard from './RequestHistoryCard'
import { useAuth } from '../../context/AuthContext.jsx'
import { subscribeToRequests, saveToCollection } from '../../utils/requestHelper.js'

export const Sidebar = () => {
    const { user } = useAuth();
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        if (!user) return;
        const unsub = subscribeToRequests(user.uid, setRequests);
        return () => unsub && unsub();
    }, [user]);

    const handleRerun = (detail) => {
        window.dispatchEvent(new CustomEvent('rerun-request', { detail }));
    };

    const handleSave = async (name, req) => {
        if (!user) return alert('Login to save collections');
        await saveToCollection(user.uid, name, req);
        alert('Saved to collection');
    };

    return (
        <>
            <div className='h-full bg-stone-900 overflow-auto' >
                <h1 className='text-2xl font-bold text-center text-white py-5 flex flex-col justify-center items-center' >Request History</h1>
                {/* Request history card */}
                {requests.map(r => (
                    <RequestHistoryCard key={r.id} req={r} onRerun={handleRerun} onSave={handleSave} />
                ))}

            </div>
        </>
    )
}

export default Sidebar

