import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { sendApiRequest, addRequest } from '../utils/requestHelper.js'

const Dashboard = () => {
  const { user } = useAuth();
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [headersText, setHeadersText] = useState('{}');
  const [bodyText, setBodyText] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    const handler = (e) => {
      const req = e.detail;
      if (!req) return;
      setMethod(req.method || 'GET');
      setUrl(req.url || '');
      try { setHeadersText(JSON.stringify(req.headers || {}, null, 2)); } catch { setHeadersText('{}'); }
      try { setBodyText(req.body ? JSON.stringify(req.body, null, 2) : ''); } catch { setBodyText(''); }
      // Auto-send on rerun
      handleSend({ auto: true, prefill: req });
    };

    window.addEventListener('rerun-request', handler);
    return () => {
      mountedRef.current = false;
      window.removeEventListener('rerun-request', handler);
    };
  }, []);

  const handleSend = async ({ auto = false, prefill = null } = {}) => {
    if (!url) return;
    setLoading(true);

    let headers = {};
    try {
      headers = headersText ? JSON.parse(headersText) : {};
    } catch (err) {
      // invalid headers JSON
      headers = {};
    }

    let body = null;
    if (bodyText && method !== 'GET' && method !== 'HEAD') {
      try {
        body = JSON.parse(bodyText);
      } catch (err) {
        // send raw string if JSON parse fails
        body = bodyText;
      }
    }

    const reqPayload = { url, method, headers, body };

    const res = await sendApiRequest(reqPayload);

    if (!mountedRef.current) return;
    setResponse(res);
    setLoading(false);

    // Save to Firestore for authenticated users
    if (user) {
      const toSave = {
        url,
        method,
        headers,
        body: body || null,
        status: res.status || null,
        responseTime: res.time || null,
        success: !!res.success,
        preview: res.data ? (typeof res.data === 'object' ? res.data : String(res.data)) : (res.error || null)
      };
      try { await addRequest(user.uid, toSave); } catch (err) { console.error('save request failed', err); }
    }
  };

  return (
    <>
      <div className='p-6 h-full flex flex-col gap-4'>
        <h2 className='text-white text-2xl font-semibold'>API Request</h2>

        <div className='flex gap-3'>
          <select value={method} onChange={e => setMethod(e.target.value)} className='px-3 py-2 rounded bg-stone-800 text-white'>
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>PATCH</option>
            <option>DELETE</option>
            <option>HEAD</option>
            <option>OPTIONS</option>
          </select>

          <input value={url} onChange={e => setUrl(e.target.value)} placeholder='https://api.example.com/users' className='flex-1 px-3 py-2 rounded bg-stone-800 text-white' />

          <button onClick={() => handleSend()} disabled={loading} className='px-4 py-2 rounded bg-emerald-500 text-black font-semibold'>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <h3 className='text-white font-medium mb-2'>Headers (JSON)</h3>
            <textarea value={headersText} onChange={e => setHeadersText(e.target.value)} rows={8} className='w-full p-3 rounded bg-stone-800 text-white font-mono text-sm' />
          </div>

          <div>
            <h3 className='text-white font-medium mb-2'>Body</h3>
            <textarea value={bodyText} onChange={e => setBodyText(e.target.value)} rows={8} className='w-full p-3 rounded bg-stone-800 text-white font-mono text-sm' />
          </div>
        </div>

        <div className='mt-4 flex-1 overflow-auto'>
          <h3 className='text-white font-medium mb-2'>Response</h3>
          <div className='bg-stone-800/60 p-4 rounded h-80 overflow-auto'>
            {response ? (
              <div className='text-white text-sm'>
                <div className='mb-2'>
                  <span className='font-semibold mr-2'>Status:</span>
                  <span>{response.status} {response.statusText || ''}</span>
                </div>

                <div className='mb-2'>
                  <span className='font-semibold mr-2'>Time:</span>
                  <span>{response.time} ms</span>
                </div>

                <div className='mb-2'>
                  <span className='font-semibold'>Headers:</span>
                  <pre className='bg-black/20 p-2 rounded mt-1 text-xs overflow-auto'>{JSON.stringify(response.headers || {}, null, 2)}</pre>
                </div>

                <div className='mb-2'>
                  <span className='font-semibold'>Body:</span>
                  <pre className='bg-black/20 p-2 rounded mt-1 text-xs overflow-auto'>{typeof response.data === 'string' ? response.data : JSON.stringify(response.data, null, 2)}</pre>
                </div>
              </div>
            ) : (
              <div className='text-white/60 italic'>No response yet. Send a request to see the result.</div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
