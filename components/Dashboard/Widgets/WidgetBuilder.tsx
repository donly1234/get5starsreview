
import React, { useState } from 'react';
import WidgetPreviewArea from './WidgetPreviewArea';

interface WidgetBuilderProps {
  onClose: () => void;
}

const WidgetBuilder: React.FC<WidgetBuilderProps> = ({ onClose }) => {
  const [config, setConfig] = useState({
    name: 'Main Homepage Widget',
    type: 'Carousel',
    primaryColor: '#2563eb',
    minRating: 4,
    showDate: true,
    showPlatform: true,
    borderRadius: '16',
    shadowIntensity: '10',
    fontFamily: 'Inter',
    count: 5,
    sources: ['Google', 'Facebook', 'Yelp']
  });

  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showCode, setShowCode] = useState(false);
  const [activeGuide, setActiveGuide] = useState<'html' | 'wordpress' | 'shopify' | 'wix'>('html');

  const widgetTypes = ['Badge', 'Carousel', 'Grid', 'Sidebar', 'Floating'];
  const fonts = ['Inter', 'Serif', 'Mono', 'System'];
  const availableSources = ['Google', 'Facebook', 'Yelp', 'Trustpilot'];

  const toggleSource = (source: string) => {
    setConfig(prev => ({
      ...prev,
      sources: prev.sources.includes(source) 
        ? prev.sources.filter(s => s !== source)
        : [...prev.sources, source]
    }));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full h-[95vh] max-w-[1400px] rounded-3xl shadow-2xl flex overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Left Side: Customization Panel */}
        <div className="w-[400px] border-r border-slate-100 flex flex-col bg-white">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Widget Builder</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Customizing: {config.name}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
            <section className="space-y-4">
              <label className="block">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Widget Name</span>
                <input 
                  type="text" 
                  value={config.name}
                  onChange={(e) => setConfig({...config, name: e.target.value})}
                  className="mt-2 w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500/20 transition-all" 
                />
              </label>

              <label className="block">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Layout Type</span>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {widgetTypes.map(t => (
                    <button 
                      key={t}
                      onClick={() => setConfig({...config, type: t})}
                      className={`p-3 text-xs font-bold rounded-xl border-2 transition-all ${config.type === t ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-sm' : 'border-slate-100 text-slate-500 hover:border-slate-200'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </label>
            </section>

            <section className="space-y-4 pt-6 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Design Settings</h4>
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 font-medium">Primary Theme Color</span>
                  <input 
                    type="color" 
                    value={config.primaryColor}
                    onChange={(e) => setConfig({...config, primaryColor: e.target.value})}
                    className="w-10 h-10 rounded-lg border-2 border-slate-100 p-1 overflow-hidden cursor-pointer" 
                  />
                </div>
                
                <div className="space-y-2">
                  <span className="text-sm text-slate-600 font-medium">Font Family</span>
                  <div className="flex bg-slate-100 p-1 rounded-xl">
                    {fonts.map(f => (
                      <button 
                        key={f}
                        onClick={() => setConfig({...config, fontFamily: f})}
                        className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all ${config.fontFamily === f ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Radius</span>
                      <span className="text-slate-900 font-bold">{config.borderRadius}px</span>
                    </div>
                    <input type="range" min="0" max="40" value={config.borderRadius} onChange={(e) => setConfig({...config, borderRadius: e.target.value})} className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Shadow</span>
                      <span className="text-slate-900 font-bold">{config.shadowIntensity}%</span>
                    </div>
                    <input type="range" min="0" max="40" value={config.shadowIntensity} onChange={(e) => setConfig({...config, shadowIntensity: e.target.value})} className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4 pt-6 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Data & Filtering</h4>
              <div className="space-y-4">
                 <div className="space-y-2">
                  <span className="text-sm text-slate-600 font-medium">Review Sources</span>
                  <div className="flex flex-wrap gap-2">
                    {availableSources.map(s => (
                      <button 
                        key={s}
                        onClick={() => toggleSource(s)}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${config.sources.includes(s) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs font-bold text-slate-600">Minimum Rating</span>
                  <select 
                    value={config.minRating}
                    onChange={(e) => setConfig({...config, minRating: Number(e.target.value)})}
                    className="bg-transparent text-xs font-black text-blue-600 focus:outline-none"
                  >
                    <option value="1">Show All</option>
                    <option value="3">3+ Stars</option>
                    <option value="4">4+ Stars</option>
                    <option value="5">5 Stars only</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <label className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl cursor-pointer group transition-colors">
                    <span className="text-xs font-bold text-slate-600">Show Review Date</span>
                    <input type="checkbox" checked={config.showDate} onChange={(e) => setConfig({...config, showDate: e.target.checked})} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500/20" />
                  </label>
                  <label className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl cursor-pointer group transition-colors">
                    <span className="text-xs font-bold text-slate-600">Show Platform Logo</span>
                    <input type="checkbox" checked={config.showPlatform} onChange={(e) => setConfig({...config, showPlatform: e.target.checked})} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500/20" />
                  </label>
                </div>
              </div>
            </section>
          </div>

          <div className="p-6 border-t border-slate-100 bg-slate-50/50">
            <button 
              onClick={() => setShowCode(true)}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2 group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
              Get Publish Code
            </button>
          </div>
        </div>

        {/* Right Side: Preview Area */}
        <div className="flex-1 bg-slate-100 flex flex-col p-8 overflow-hidden relative">
          <div className="flex items-center justify-between mb-8">
             <div className="flex bg-white/80 backdrop-blur p-1 rounded-xl shadow-sm border border-slate-200/50">
              <button 
                onClick={() => setViewMode('desktop')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'desktop' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                Desktop
              </button>
              <button 
                onClick={() => setViewMode('mobile')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'mobile' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                Mobile
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Live Preview
            </div>
          </div>

          <div className={`flex-1 mx-auto bg-white shadow-2xl overflow-hidden transition-all duration-500 flex flex-col ${viewMode === 'mobile' ? 'w-[375px] rounded-[48px] border-[14px] border-slate-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]' : 'w-full rounded-2xl border-t-[34px] border-slate-200 relative'}`}>
            {viewMode === 'desktop' && (
              <div className="absolute top-[-24px] left-12 flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
              </div>
            )}
            
            <div className="flex-1 overflow-y-auto p-12 bg-[#fcfdfe] relative">
              <div className="max-w-4xl mx-auto space-y-16 py-8">
                <div className="space-y-6 text-center">
                  <div className="h-2 w-24 bg-blue-100 rounded-full mx-auto"></div>
                  <div className="h-10 w-80 bg-slate-100 rounded-2xl mx-auto"></div>
                </div>

                {/* THE WIDGET PREVIEW */}
                <WidgetPreviewArea config={config} />

                <div className="space-y-6 pt-12">
                  <div className="h-3 w-full bg-slate-50 rounded-full"></div>
                  <div className="h-3 w-3/4 bg-slate-50 rounded-full"></div>
                  <div className="h-3 w-5/6 bg-slate-50 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {showCode && (
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl flex items-center justify-center p-8 z-50">
              <div className="bg-white w-full max-w-3xl rounded-[32px] overflow-hidden animate-in zoom-in-95 duration-300 shadow-2xl">
                <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">Publish Widget</h3>
                    <p className="text-slate-500 text-sm mt-1">Embed your reviews with a simple copy-paste.</p>
                  </div>
                  <button onClick={() => setShowCode(false)} className="p-3 hover:bg-white rounded-full text-slate-400 shadow-sm border border-slate-200 transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>

                <div className="flex h-[400px]">
                  {/* Sidebar Nav */}
                  <div className="w-48 bg-slate-50 border-r border-slate-100 p-4 space-y-2">
                    {['html', 'wordpress', 'shopify', 'wix'].map(p => (
                      <button 
                        key={p}
                        onClick={() => setActiveGuide(p as any)}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold capitalize transition-all ${activeGuide === p ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-200'}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  {/* Guide Content */}
                  <div className="flex-1 p-8 overflow-y-auto">
                    {activeGuide === 'html' && (
                      <div className="space-y-6">
                        <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-widest">Installation Steps</h4>
                        <ol className="text-sm text-slate-600 space-y-4">
                          <li className="flex gap-4"><span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-black shrink-0">1</span> Copy the code snippet below.</li>
                          <li className="flex gap-4"><span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-black shrink-0">2</span> Paste it into your &lt;body&gt; tag where you want it to appear.</li>
                        </ol>
                        <div className="bg-slate-900 rounded-2xl p-6 font-mono text-[11px] text-blue-400 overflow-x-auto relative group border border-blue-900/50">
                          <button className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-[10px] font-black hover:bg-blue-700 transition-all opacity-0 group-hover:opacity-100">Copy Code</button>
                          <pre className="leading-relaxed">
{`<div id="g5sr-widget"></div>
<script src="https://cdn.g5sr.io/w.js" async></script>
<script>
  window.G5SR_CONFIG = {
    id: 'WID_${Math.random().toString(36).substr(2, 9).toUpperCase()}',
    type: '${config.type}',
    theme: '${config.primaryColor}'
  };
</script>`}
                          </pre>
                        </div>
                      </div>
                    )}
                    {activeGuide !== 'html' && (
                      <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                         <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 text-3xl">🔌</div>
                         <h4 className="text-xl font-bold text-slate-900 capitalize">{activeGuide} Integration Guide</h4>
                         <p className="text-slate-500 text-sm max-w-xs mx-auto">Download our official {activeGuide} app or follow the manual HTML steps for quick installation.</p>
                         <button className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">Go to App Store</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WidgetBuilder;
