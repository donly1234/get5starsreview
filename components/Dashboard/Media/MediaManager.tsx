
import React, { useState } from 'react';

const MediaManager: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'library' | 'qr'>('library');
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
            Local Growth Assets
            <span className="bg-emerald-100 text-emerald-600 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest font-black">Pro</span>
          </h1>
          <p className="text-slate-500 text-sm font-bold">Manage visual content and real-world review generation tools.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setActiveSubTab('library')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeSubTab === 'library' ? 'bg-black text-white' : 'text-slate-400 hover:text-slate-900'}`}
          >
            GBP Media Library
          </button>
          <button 
            onClick={() => setActiveSubTab('qr')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeSubTab === 'qr' ? 'bg-black text-white' : 'text-slate-400 hover:text-slate-900'}`}
          >
            Review QR Kit
          </button>
        </div>
      </div>

      {activeSubTab === 'library' ? (
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
                </div>
              ))}
              <button 
                onClick={handleUpload}
                disabled={isUploading}
                className="aspect-square rounded-[32px] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center gap-3 hover:bg-slate-50 transition-all group"
              >
                {isUploading ? <div className="w-8 h-8 border-4 border-slate-200 border-t-emerald-600 rounded-full animate-spin"></div> : (
                  <>
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">+</div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Add New Media</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-6 sticky top-8">
              {selectedMedia ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Media Details</h3>
                  <div className="aspect-video rounded-3xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img src={selectedMedia.url} className="w-full h-full object-cover" alt="Preview" />
                  </div>
                  <textarea 
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all resize-none h-24" 
                    placeholder="Describe this post for SEO..."
                  />
                  <button 
                    onClick={handlePublish}
                    disabled={publishStatus !== null}
                    className="w-full py-5 bg-black text-white rounded-[24px] font-black uppercase text-sm shadow-xl hover:bg-emerald-600 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {publishStatus || 'Publish to GBP'}
                  </button>
                </div>
              ) : (
                <div className="text-center py-12 space-y-6">
                  <div className="w-20 h-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] flex items-center justify-center mx-auto text-3xl">🖼️</div>
                  <p className="text-slate-400 text-sm font-bold mt-2">Select media to publish to Google Business Profile.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in zoom-in-95 duration-500">
           <div className="bg-white p-12 rounded-[48px] border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 space-y-8">
                 <div className="space-y-4">
                    <span className="bg-blue-100 text-blue-600 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest">In-Store Growth</span>
                    <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter italic leading-none">Instant <br /><span className="text-blue-600">Review QR Kit</span></h2>
                    <p className="text-slate-500 font-medium">Generate professional print-ready QR codes that take customers directly to your Google review page. Increase feedback by up to 300% with physical touchpoints.</p>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <label className="block space-y-2">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Color</span>
                       <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                          <input type="color" defaultValue="#000000" className="w-8 h-8 rounded-lg cursor-pointer bg-transparent" />
                          <span className="text-xs font-bold text-slate-600 uppercase">#000000</span>
                       </div>
                    </label>
                    <label className="block space-y-2">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Frame Text</span>
                       <input type="text" defaultValue="Review Us on Google" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold" />
                    </label>
                 </div>

                 <div className="flex gap-4">
                    <button className="flex-1 bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl shadow-black/10">Download PDF Kit</button>
                    <button className="px-8 bg-slate-50 text-slate-400 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:text-slate-900 border border-slate-100 transition-all">Preview</button>
                 </div>
              </div>

              <div className="w-full md:w-[400px] aspect-[4/5] bg-slate-50 rounded-[40px] border-8 border-white shadow-2xl flex flex-col items-center justify-center p-12 text-center space-y-8 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors"></div>
                 <h4 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-tight relative z-10">LOVE OUR <br /> SERVICE?</h4>
                 <div className="w-48 h-48 bg-white rounded-3xl p-4 shadow-xl border border-slate-100 relative z-10">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://get5starsreview.com" alt="QR Code" className="w-full h-full object-contain" />
                 </div>
                 <div className="relative z-10">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Scan to Review</p>
                    <div className="flex items-center gap-2 justify-center">
                       <span className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Get5Stars</span>
                       <div className="w-12 h-1 bg-emerald-500 rounded-full"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default MediaManager;
