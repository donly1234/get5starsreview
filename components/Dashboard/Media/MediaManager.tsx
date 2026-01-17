
import React, { useState } from 'react';

const MediaManager: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [publishStatus, setPublishStatus] = useState<string | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<any | null>(null);
  const [caption, setCaption] = useState('');

  const [mediaItems, setMediaItems] = useState([
    { id: 'm1', type: 'image', url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400', status: 'Published', date: 'Oct 12, 2024' },
    { id: 'm2', type: 'image', url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400', status: 'Published', date: 'Oct 10, 2024' },
    { id: 'm3', type: 'video', url: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&q=80&w=400', status: 'Draft', date: 'Oct 14, 2024' },
  ]);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      const newMedia = {
        id: `m${Date.now()}`,
        type: 'image',
        url: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=400',
        status: 'Draft',
        date: 'Just now'
      };
      setMediaItems([newMedia, ...mediaItems]);
    }, 1500);
  };

  const handlePublish = () => {
    if (!selectedMedia) return;
    setPublishStatus('Publishing...');
    setTimeout(() => {
      setPublishStatus('Success! Posted to GBP.');
      setMediaItems(prev => prev.map(item => 
        item.id === selectedMedia.id ? { ...item, status: 'Published' } : item
      ));
      setTimeout(() => {
        setPublishStatus(null);
        setSelectedMedia(null);
      }, 2000);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase flex items-center gap-3">
            GBP Media Hub
            <span className="bg-[#16A34A]/10 text-[#16A34A] text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest font-black border border-[#16A34A]/20">Active</span>
          </h1>
          <p className="text-slate-500 text-sm font-bold">Upload and publish images or videos directly to your Google Business Profile.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleUpload}
            disabled={isUploading}
            className="bg-black text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#16A34A] transition-all shadow-lg shadow-black/10 flex items-center gap-2 active:scale-95 disabled:opacity-50"
          >
            {isUploading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
                Upload Media
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {mediaItems.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedMedia(item)}
                className={`relative group aspect-square rounded-[32px] overflow-hidden border-4 transition-all cursor-pointer ${selectedMedia?.id === item.id ? 'border-[#16A34A] scale-95' : 'border-white shadow-sm hover:shadow-xl'}`}
              >
                <img src={item.url} alt="media" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all"></div>
                <div className="absolute top-4 left-4">
                  <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${item.status === 'Published' ? 'bg-emerald-500 text-white' : 'bg-white text-slate-900 shadow-lg'}`}>
                    {item.status}
                  </span>
                </div>
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40">
                      <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-6 sticky top-8">
            {selectedMedia ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Media Details</h3>
                  <button onClick={() => setSelectedMedia(null)} className="text-slate-400 hover:text-slate-900 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>
                <div className="aspect-video rounded-3xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img src={selectedMedia.url} className="w-full h-full object-cover" alt="Preview" />
                </div>
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Update Caption</span>
                    <textarea 
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      className="mt-2 w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#16A34A]/20 focus:border-[#16A34A] outline-none transition-all resize-none h-24" 
                      placeholder="Share what's happening at your business..."
                    />
                  </label>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-lg">📍</span>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-blue-800 uppercase tracking-widest leading-none">Auto-Geotag</p>
                        <p className="text-[8px] text-blue-600 font-bold mt-1 uppercase">Downtown Flagship</p>
                      </div>
                    </div>
                    <div className="w-8 h-4 bg-blue-600 rounded-full relative">
                      <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handlePublish}
                  disabled={publishStatus !== null}
                  className={`w-full py-5 rounded-[24px] font-black text-lg transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 ${publishStatus === 'Publishing...' ? 'bg-slate-100 text-slate-400' : 'bg-black text-white hover:bg-[#16A34A] shadow-black/10'}`}
                >
                  {publishStatus ? (
                    <>
                      {publishStatus === 'Publishing...' && <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin"></div>}
                      <span>{publishStatus}</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                      Publish to GBP
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="text-center py-12 space-y-6">
                <div className="w-20 h-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] flex items-center justify-center mx-auto text-3xl text-slate-300">
                  🖼️
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter italic">No Media Selected</h3>
                  <p className="text-slate-400 text-sm font-bold mt-2 leading-relaxed">Select an image or video from your library to manage its GBP publication settings.</p>
                </div>
                <div className="pt-4 space-y-3">
                  <div className="p-4 bg-green-50 rounded-2xl border border-green-100 text-left">
                    <p className="text-[10px] font-black text-green-700 uppercase tracking-[0.2em] mb-2">Pro Tip</p>
                    <p className="text-xs text-green-600 font-medium leading-relaxed">Businesses that post at least 3 photos per week on their GBP see <span className="font-black">1.5x more calls</span> than those that don't.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaManager;
