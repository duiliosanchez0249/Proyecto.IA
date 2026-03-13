require('dotenv').config(); // <-- Esto lee el archivo .env
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Ahora la llave se jala de las variables de entorno, no está escrita aquí
const API_KEY = process.env.GROQ_API_KEY; 

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  
  if (!API_KEY) {
    return res.status(500).json({ reply: "Error: No se encontró la API Key en el servidor." });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { 
            role: "system", 
            content: `Eres el asistente médico virtual de 'HealthFlow'. 
            REGLAS:
            1. NO RECETAR: Nunca menciones medicamentos.
            2. NO DIAGNOSTICAR: Habla de "posibles causas".
            3. DERIVACIÓN: Sugiere Cardiología, Pediatría, Ginecología o Medicina General.
            4. CITAS: Pide Nombre, Especialidad y Horario (L-V, 9am-6pm).` 
          },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });

  } catch (error) {
    res.status(500).json({ reply: "Error de conexión en el servidor." });
  }
});

app.listen(5000, () => console.log('🚀 Servidor seguro en puerto 5000'));
