import React, { useState, useEffect } from 'react';

// --- SVG Icons (inlined to avoid dependencies) ---
const IconShieldCheck = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-blue-700"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
);

const IconScan = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-blue-700"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><line x1="7" y1="12" x2="17" y2="12"></line></svg>
);

const IconCloudCog = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-blue-700"><path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9"></path><path d="M12 17a2.5 2.5 0 0 1-2.5-2.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5c0 .8-.4 1.5-1 2"></path><path d="m14.2 19.8 1.1-1.1"></path><path d="M12 22v-2.5"></path><path d="m7.8 19.8-1.1-1.1"></path><path d="M12 12v-2.5"></path><path d="m16.2 14.8-1.1 1.1"></path><path d="m9.8 14.8 1.1 1.1"></path></svg>
);

const IconMenu = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>;
const IconX = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>;
const IconPlusCircle = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconSearch = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const IconCamera = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>;
const IconLightbulb = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>;
const IconMessageSquare = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;

// --- App Structure Components ---

const Header = ({ setPage, setIsLoginOpen }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', page: 'home' },
        { name: 'How It Helps', page: 'about' },
        { name: 'AI Vet Assistant', page: 'chat' },
        { name: 'Contact Us', page: 'contact' },
    ];

    return (
        <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-30">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-green-700 cursor-pointer" onClick={() => setPage('home')}>
                    MooID
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map(link => (
                        <a key={link.page} href="#" className="text-gray-600 hover:text-green-700 font-medium transition-colors" onClick={() => setPage(link.page)}>{link.name}</a>
                    ))}
                    <button onClick={() => setIsLoginOpen(true)} className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700 transition-all">
                        Login
                    </button>
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <IconX /> : <IconMenu />}
                    </button>
                </div>
            </nav>
            {isMenuOpen && (
                <div className="md:hidden bg-white py-4">
                    {navLinks.map(link => (
                        <a key={link.page} href="#" className="block text-center py-2 text-gray-600 hover:text-green-700" onClick={() => { setPage(link.page); setIsMenuOpen(false); }}>{link.name}</a>
                    ))}
                    <div className="text-center mt-4">
                        <button onClick={() => { setIsLoginOpen(true); setIsMenuOpen(false); }} className="bg-green-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-700 transition-all">
                            Login
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

const Footer = () => (
    <footer className="bg-white mt-12 py-8 border-t">
        <div className="container mx-auto text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} MooID Technologies. All rights reserved.</p>
            <p className="text-sm mt-2">Revolutionizing dairy farming with AI.</p>
        </div>
    </footer>
);


// --- Page Components ---

const HomePage = ({ setIsPhotoGuideOpen }) => {
    const [registerFileName, setRegisterFileName] = useState('');
    const [identifyFileName, setIdentifyFileName] = useState('');
    
    // Mock result state
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const [resultImg, setResultImg] = useState(null);

    const handleFileChange = (e, action) => {
        const file = e.target.files[0];
        if (!file) return;

        if (action === 'register') {
            setRegisterFileName(file.name);
            // Add registration logic here
        } else if (action === 'identify') {
            setIdentifyFileName(file.name);
            setIsLoading(true);
            setError(null);
            setResult(null);

            // Mock API call
            setTimeout(() => {
                if (Math.random() > 0.25) { // 75% success chance
                    setResult({
                        tagId: 'B-4981',
                        name: 'Daisy',
                        dob: '2021-03-15',
                        breed: 'Holstein',
                        checkup: '2025-09-15'
                    });
                     const reader = new FileReader();
                    reader.onload = (e) => setResultImg(e.target.result);
                    reader.readAsDataURL(file);

                } else {
                    setError('No match found. Please use a clearer photo and try again.');
                }
                setIsLoading(false);
            }, 2000);
        }
    };

    return (
        <main className="container mx-auto p-6">
            {/* Hero Section */}
            <section className="grid md:grid-cols-2 gap-8 items-center my-12">
                <div className="text-left">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">AI-Powered Biometric Cow Identification</h1>
                    <p className="mt-4 text-lg text-gray-600">Using unique muzzle patterns as a natural, unalterable fingerprint for your cattle.</p>
                    <div className="mt-8 space-y-6">
                        <div className="flex items-start"><div className="bg-blue-100 p-3 rounded-full mr-4"><IconShieldCheck/></div><div><h3 className="font-bold text-lg">Secure & Reliable</h3><p className="text-gray-600">Eliminate tag loss and fraud with biometric certainty.</p></div></div>
                        <div className="flex items-start"><div className="bg-blue-100 p-3 rounded-full mr-4"><IconScan/></div><div><h3 className="font-bold text-lg">Easy Mobile Scanning</h3><p className="text-gray-600">Instant identification with a single photo from your phone.</p></div></div>
                        <div className="flex items-start"><div className="bg-blue-100 p-3 rounded-full mr-4"><IconCloudCog/></div><div><h3 className="font-bold text-lg">Smart Farm Management</h3><p className="text-gray-600">Cloud-based AI for accurate health and ownership records.</p></div></div>
                    </div>
                </div>
                <div>
                     <img src=".\public\images\cow_image.png" alt="Cow with muzzle pattern overlay" className="rounded-2xl shadow-2xl w-full h-auto object-cover"/>
                </div>
            </section>

            {/* Action Cards */}
            <div className="grid md:grid-cols-2 gap-8 mt-20">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <div className="flex items-center space-x-4"><div className="bg-green-100 p-3 rounded-full"><IconPlusCircle /></div><h2 className="text-2xl font-bold">Register a New Cow</h2></div>
                    <p className="mt-4 text-gray-600">Add a new cow to your digital herd. A clear photo is all you need.</p>
                    <div className="mt-6 space-y-4">
                        <input type="text" placeholder="Cow's Name (e.g., Daisy)" className="w-full border-gray-300 rounded-lg p-3 focus:ring-green-500 focus:border-green-500" />
                        <input type="text" placeholder="Unique Ear Tag ID (e.g., B-4981)" className="w-full border-gray-300 rounded-lg p-3 focus:ring-green-500 focus:border-green-500" />
                        <input type="file" id="register-file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'register')} />
                        <label htmlFor="register-file" className="cursor-pointer w-full text-center bg-green-600 text-white font-semibold py-3 px-6 rounded-lg block hover:bg-green-700 transition">Upload Muzzle Photo</label>
                        {registerFileName && <p className="text-center mt-2 text-sm text-gray-500">{registerFileName}</p>}
                        <button onClick={() => setIsPhotoGuideOpen(true)} className="w-full text-center text-sm text-blue-600 hover:underline">How to take a good photo?</button>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <div className="flex items-center space-x-4"><div className="bg-blue-100 p-3 rounded-full"><IconSearch /></div><h2 className="text-2xl font-bold">Identify a Cow</h2></div>
                    <p className="mt-4 text-gray-600">Instantly retrieve a cow's profile, health records, and history.</p>
                    <div className="mt-6">
                        <input type="file" id="identify-file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'identify')} />
                        <label htmlFor="identify-file" className="cursor-pointer w-full text-center bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg block hover:bg-blue-700 transition">Scan Muzzle to Identify</label>
                        {identifyFileName && <p className="text-center mt-2 text-sm text-gray-500">{identifyFileName}</p>}
                    </div>
                </div>
            </div>

            {/* Result Section */}
            {(isLoading || error || result) && (
                <section className="mt-12">
                    <h2 className="text-3xl font-bold text-center mb-6">Identification Result</h2>
                    {isLoading && <div className="text-center p-8"><div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto"></div><p className="mt-4 text-lg font-medium text-gray-600">Analyzing Muzzle Pattern...</p></div>}
                    {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg max-w-3xl mx-auto shadow-md"><p className="font-bold">Error</p><p>{error}</p></div>}
                    {result && <div className="bg-white max-w-3xl mx-auto rounded-2xl shadow-xl overflow-hidden md:flex"><div className="md:flex-shrink-0"><img className="h-56 w-full object-cover md:w-56" src={resultImg} alt="Cow Muzzle" /></div><div className="p-8 w-full"><div className="uppercase tracking-wide text-sm text-green-600 font-bold">ID: {result.tagId}</div><h3 className="block mt-1 text-3xl leading-tight font-extrabold text-black">{result.name}</h3><div className="mt-4 space-y-3"><p><strong>Birth Date:</strong> {result.dob}</p><p><strong>Breed:</strong> {result.breed}</p><p><strong>Last Health Check:</strong> {result.checkup}</p></div><button className="mt-6 w-full bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition">View Full Medical History</button></div></div>}
                </section>
            )}
        </main>
    );
};

const AboutPage = () => (
    <div className="bg-white py-16">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">How MooID Helps Farmers</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">We provide a seamless, secure, and stress-free way to manage your herd, improving efficiency and profitability for the modern farm.</p>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6">
                    <div className="bg-green-100 text-green-700 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4"><IconShieldCheck /></div>
                    <h3 className="font-bold text-xl mb-2">Prevent Economic Loss</h3>
                    <p className="text-gray-600">Lost ear tags lead to incomplete medical histories and ownership disputes. Biometric ID is permanent, saving you money and hassle.</p>
                </div>
                <div className="p-6">
                    <div className="bg-green-100 text-green-700 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4"><IconScan /></div>
                    <h3 className="font-bold text-xl mb-2">Streamline Health Monitoring</h3>
                    <p className="text-gray-600">Instantly access a cow's complete health history with a simple photo. Ensure timely vaccinations and treatments for a healthier herd.</p>
                </div>
                <div className="p-6">
                    <div className="bg-green-100 text-green-700 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4"><IconCloudCog /></div>
                    <h3 className="font-bold text-xl mb-2">Enhance Farm Security</h3>
                    <p className="text-gray-600">Un-alterable muzzle patterns act as a safeguard against theft and fraud, providing definitive proof of ownership for every animal.</p>
                </div>
            </div>
        </div>
    </div>
);

const ChatPage = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hello! I am your AI Vet Assistant. How can I help you with your herd today?', sender: 'ai' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        
        const newMessages = [...messages, { id: Date.now(), text: input, sender: 'user' }];
        setMessages(newMessages);
        setInput('');

        // Mock AI Response
        setTimeout(() => {
            const aiResponses = [
                "For a balanced diet, ensure your cows have access to quality pasture and supplement with a total mixed ration (TMR) containing silage, hay, and grains.",
                "Signs of good health in a cow include a shiny coat, clear eyes, alertness, and consistent cud-chewing. Monitor for any changes in behavior or appetite.",
                "The ideal temperature range for dairy cows is between 40°F (4°C) and 75°F (24°C). Ensure proper ventilation and shade to prevent heat stress.",
                "I am an AI assistant. For any serious medical concerns, please consult a qualified veterinarian immediately."
            ];
            const responseText = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            setMessages(prev => [...prev, { id: Date.now() + 1, text: responseText, sender: 'ai' }]);
        }, 1500);
    };

    return (
        <div className="container mx-auto p-6 max-w-3xl">
             <div className="text-center mb-8">
                 <h1 className="text-4xl font-bold">AI Vet Assistant</h1>
                 <p className="text-gray-600 mt-2">Get instant advice on nutrition, health, and well-being for your cattle.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-4 flex flex-col h-[60vh]">
                <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'ai' && <div className="bg-gray-200 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0"><IconLightbulb /></div>}
                            <div className={`rounded-xl p-3 max-w-md ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex gap-2">
                    <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} placeholder="Ask about cow nutrition, health, etc..." className="w-full border-gray-300 rounded-lg p-3 focus:ring-green-500 focus:border-green-500" />
                    <button onClick={handleSend} className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition">Send</button>
                </div>
            </div>
        </div>
    );
};

const ContactPage = () => (
    <div className="container mx-auto px-6 py-16">
        <div className="text-center">
            <h1 className="text-4xl font-bold">Get In Touch</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">Have questions or want to partner with us? We’d love to hear from you.</p>
        </div>
        <div className="mt-12 max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-lg">
            <form className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" id="name" className="mt-1 w-full border-gray-300 rounded-lg p-3 focus:ring-green-500 focus:border-green-500" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input type="email" id="email" className="mt-1 w-full border-gray-300 rounded-lg p-3 focus:ring-green-500 focus:border-green-500" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea id="message" rows="4" className="mt-1 w-full border-gray-300 rounded-lg p-3 focus:ring-green-500 focus:border-green-500"></textarea>
                </div>
                <button type="submit" className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition">Send Message</button>
            </form>
        </div>
    </div>
);


// --- Modal Components ---

const LoginModal = ({ isOpen, setIsOpen }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setIsOpen(false)}>
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center transform transition-all" onClick={e => e.stopPropagation()}>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
                <p className="text-gray-600 mb-8">Sign in to manage your herd.</p>
                <button className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition mb-4">
                    <img src="https://www.google.com/favicon.ico" alt="Google icon" className="w-6 h-6 mr-3"/>Sign in with Google
                </button>
                <div className="relative flex py-5 items-center"><div className="flex-grow border-t border-gray-300"></div><span className="flex-shrink mx-4 text-gray-400">OR</span><div className="flex-grow border-t border-gray-300"></div></div>
                <div>
                    <input type="tel" placeholder="Enter your phone number" className="w-full border-gray-300 rounded-lg p-3 focus:ring-green-500 focus:border-green-500 mb-4"/>
                    <button className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition">Sign in with Phone</button>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-sm text-gray-500 mt-6 hover:underline">Continue as guest</button>
            </div>
        </div>
    );
};

const PhotoGuideModal = ({ isOpen, setIsOpen }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={() => setIsOpen(false)}>
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">How to Take a Good Muzzle Photo</h2>
                    <button onClick={() => setIsOpen(false)}><IconX /></button>
                </div>
                <p className="text-gray-600 mb-6">For the best AI recognition, follow these simple steps. A great photo ensures over 99% accuracy.</p>
                
                <div className="grid md:grid-cols-2 gap-6 text-center">
                    {/* Do */}
                    <div>
                        <h3 className="font-bold text-lg text-green-600 mb-2">DO THIS</h3>
                        <div className="space-y-4">
                            <div className="p-4 border rounded-lg bg-green-50">
                                <p className="font-semibold">✅ Face the Cow Directly</p>
                                <p className="text-sm text-gray-600">Ensure the muzzle is centered and fills most of the frame.</p>
                            </div>
                             <div className="p-4 border rounded-lg bg-green-50">
                                <p className="font-semibold">✅ Use Good, Even Lighting</p>
                                <p className="text-sm text-gray-600">Daylight is best. Avoid harsh shadows or direct sunlight.</p>
                            </div>
                             <div className="p-4 border rounded-lg bg-green-50">
                                <p className="font-semibold">✅ Wipe the Muzzle Clean</p>
                                <p className="text-sm text-gray-600">Gently clean any dirt or debris from the nose area.</p>
                            </div>
                        </div>
                    </div>
                    {/* Don't */}
                     <div>
                        <h3 className="font-bold text-lg text-red-600 mb-2">AVOID THIS</h3>
                         <div className="space-y-4">
                            <div className="p-4 border rounded-lg bg-red-50">
                                <p className="font-semibold">❌ Angled Photos</p>
                                <p className="text-sm text-gray-600">Side-on shots distort the muzzle pattern.</p>
                            </div>
                             <div className="p-4 border rounded-lg bg-red-50">
                                <p className="font-semibold">❌ Blurry or Dark Images</p>
                                <p className="text-sm text-gray-600">The AI can't see details if the photo is out of focus or too dark.</p>
                            </div>
                             <div className="p-4 border rounded-lg bg-red-50">
                                <p className="font-semibold">❌ Photos from Too Far Away</p>
                                <p className="text-sm text-gray-600">The muzzle needs to be the main subject, not the whole cow.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="mt-8 w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition">Got it!</button>
            </div>
        </div>
    );
};


// --- Main App Component ---

export default function App() {
    const [page, setPage] = useState('home');
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isPhotoGuideOpen, setIsPhotoGuideOpen] = useState(false);
    
    useEffect(() => {
        // This could be used to check auth status, for example
    }, []);

    const renderPage = () => {
        switch (page) {
            case 'home':
                return <HomePage setIsPhotoGuideOpen={setIsPhotoGuideOpen} />;
            case 'about':
                return <AboutPage />;
            case 'chat':
                return <ChatPage />;
            case 'contact':
                return <ContactPage />;
            default:
                return <HomePage setIsPhotoGuideOpen={setIsPhotoGuideOpen} />;
        }
    };

    return (
        <div className="bg-gray-50 text-gray-800 font-sans">
            <Header setPage={setPage} setIsLoginOpen={setIsLoginOpen} />
            {renderPage()}
            <Footer />

            <LoginModal isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
            <PhotoGuideModal isOpen={isPhotoGuideOpen} setIsOpen={setIsPhotoGuideOpen} />
        </div>
    );
}
