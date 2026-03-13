import React, { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: '¡Hola! Soy tu asistente de salud. ¿En qué especialidad buscas agendar tu cita?' }
  ]);
  const [input, setInput] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    // 1. Guardamos tu mensaje (ahora se verá azul con texto blanco)
    const userMessage = { role: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    const textToSend = input;
    setInput('');

    try {
      // 2. Intentamos conectar con el servidor en el puerto 5000
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });

      const data = await response.json();
      
      // 3. Respuesta de la IA
      setMessages([...newMessages, { role: 'ai', text: data.reply }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([...newMessages, { role: 'ai', text: '❌ Error: ¿Prendiste el backend en la otra terminal?' }]);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">HealthFlow AI</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Usuario</label>
              <input type="text" required className="w-full p-3 mt-1 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="admin@salud.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Contraseña</label>
              <input type="password" required className="w-full p-3 mt-1 border rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              Entrar al Sistema
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6">
      <nav className="w-full max-w-4xl flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-blue-800">Centro Médico AAR (IA)</h1>
        <button onClick={() => setIsLoggedIn(false)} className="text-slate-500 hover:text-red-500 font-medium">Salir</button>
      </nav>

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col h-[600px]">
        {/* Header Chat */}
        <div className="bg-blue-600 p-5 text-white flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">🩺</div>
          <div>
            <p className="font-bold leading-none">Asistente Virtual</p>
            <span className="text-xs text-blue-100">En línea ahora</span>
          </div>
        </div>

        {/* Mensajes - AQUÍ ESTÁ EL CAMBIO DE COLORES */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' // Usuario: Azul fuerte, texto blanco
                : 'bg-gray-100 text-slate-800 rounded-tl-none border border-slate-200' // IA: Gris claro, texto oscuro
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 bg-slate-50 border-t flex gap-2">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Escribe tu mensaje aquí..." 
            className="flex-1 p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900"
          />
          <button onClick={sendMessage} className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition-transform active:scale-95 font-bold">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
