# HealthFlow AI - Asistente Médico Inteligente

¡Bienvenido a **HealthFlow AI**! Una solución innovadora que combina el poder de la Inteligencia Artificial con la gestión clínica para ofrecer una experiencia de atención al paciente rápida, segura y eficiente.

---

## Descripción del Proyecto
Este asistente virtual utiliza modelos de lenguaje de gran escala (Llama 3 vía Groq API) para actuar como el primer punto de contacto en el **Centro Médico HealthFlow**. Su objetivo es guiar a los usuarios, realizar un triaje básico y agendar citas médicas siguiendo protocolos de seguridad estrictos.

### 📸 Vista Previa del Sistema

| Acceso Seguro | Interacción Inicial |
|---|---|
| (<img width="538" height="417" alt="image" src="https://github.com/user-attachments/assets/e409b91b-4a91-46e4-8d28-1889e00f974a" />
) | (<img width="819" height="719" alt="image" src="https://github.com/user-attachments/assets/1c091428-5105-45d3-ac91-a69749822692" />
) |
| *Interfaz de autenticación para personal médico.* | *El asistente está listo para escuchar al paciente.* |

| Triaje Inteligente | Agendamiento de Citas |
|---|---|
| (<img width="820" height="734" alt="image" src="https://github.com/user-attachments/assets/caef1f95-1030-4507-889c-e56fbab59fa7" />
) | (<img width="1026" height="865" alt="image" src="https://github.com/user-attachments/assets/1b450542-4268-4655-8939-e98a803203ee" />
) |
| *Detección de síntomas y sugerencia de especialidad.* | *Recolección de datos y selección de especialistas.* |

---

## 🛠️ Tecnologías Utilizadas
- **Frontend:** React.js con Vite (Interfaz moderna y reactiva).
- **Backend:** Node.js + Express (Servidor robusto).
- **IA:** Llama 3 - 70B (Procesamiento de lenguaje natural de alta velocidad).
- **Seguridad:** Dotenv para gestión de variables de entorno y reglas de protección médica.

---

## Reglas de Seguridad Médica (Guardrails)
El asistente está configurado bajo estrictos parámetros éticos:
1. **No Medicación:** El sistema tiene prohibido sugerir fármacos o dosis.
2. **No Diagnóstico Final:** Siempre refiere a "posibles causas" y prioriza la evaluación profesional.
3. **Derivación Correcta:** Identifica palabras clave para enviar al paciente a Cardiología, Pediatría, Ginecología o Medicina General.

---

## Guía de Despliegue (Tutorial)

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

### 1. Clonar el Repositorio
```bash
git clone [https://github.com/TU_USUARIO/TU_REPOSITORIO.git](https://github.com/TU_USUARIO/TU_REPOSITORIO.git)
cd Proyecto-salud
