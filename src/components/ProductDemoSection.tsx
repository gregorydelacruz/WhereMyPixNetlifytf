/* styles.css */
#mc_embed_signup {
  background: #fff;
  clear: left;
  font: 14px Helvetica, Arial, sans-serif;
  width: 100%;
}

#mc_embed_signup h2 {
  margin: 0 0 10px 0;
  padding: 0;
}

.mc-field-group {
  margin-bottom: 15px;
}

.mc-field-group label {
  display: block;
  margin-bottom: 5px;
}

.mc-field-group input {
  width: 100%;
  box-sizing: border-box;
}

.required:before {
  content: '*';
  color: #ff0000;
  margin-right: 2px;
}

.button {
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}

/* Additional styles for the popup */
.glass {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}