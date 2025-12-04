import React from 'react'

const RequestHistoryCard = ({ req, onRerun, onSave }) => {
    if (!req) return null;

    const { method = 'GET', status = '', responseTime = '', url = '', preview = '', createdAt } = req;

    const handleRerun = () => {
        // dispatch a custom event so Dashboard can pick it up
        const detail = {
            url,
            method,
            headers: req.headers || {},
            body: req.body || null
        };
        if (onRerun) return onRerun(detail);
        window.dispatchEvent(new CustomEvent('rerun-request', { detail }));
    };

    const handleSave = async () => {
        const name = window.prompt('Collection name to save this request to:', 'My Collection');
        if (!name) return;
        if (onSave) return onSave(name, req);
    };

    const dateStr = createdAt ? new Date(createdAt.seconds ? createdAt.seconds * 1000 : createdAt).toLocaleString() : '';

    return (
        <div className="bg-stone-800/80 backdrop-blur-md 
    text-white p-4 m-3 rounded-xl shadow-lg 
    w-full md:w-[80%] flex flex-col gap-3 transition hover:bg-stone-800">

            {/* Top Row: Method + Status + Time */}
            <div className="flex items-center justify-between">

                {/* Method */}
                <span className={`text-sm font-semibold px-2 py-1 rounded-lg border ${method === 'GET' ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/8' : 'text-green-400 border-green-500/30 bg-green-500/8'}`}>
                    {method}
                </span>

                <div className="flex items-center gap-4">
                    {/* Status Code */}
                    <span className="text-green-400 text-sm font-medium">
                        {status}
                    </span>

                    {/* Response time */}
                    <span className="text-white/60 text-sm">
                        {responseTime ? `${responseTime}ms` : ''}
                    </span>
                </div>
            </div>

            {/* URL */}
            <p className="text-sm break-all text-white/90">
                {url}
            </p>

            {/* Response Preview */}
            <p className="text-xs text-white/50 italic line-clamp-1">
                {typeof preview === 'string' ? preview : JSON.stringify(preview)}
            </p>

            {/* Footer row */}
            <div className="flex items-center justify-between text-xs text-white/40">
                <span>{dateStr}</span>
                <div className='flex items-center gap-3'>
                    <button onClick={handleRerun} className="text-white/50 hover:text-white transition">↻ Re-run</button>
                    <button onClick={handleSave} className="text-white/50 hover:text-white transition">＋ Save</button>
                </div>
            </div>
        </div>
    )
}

export default RequestHistoryCard
