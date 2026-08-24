---
lang: "es"
title: "De SQL Injection a Remote Code Execution: Análisis de un Reto CTF"
description: "Walkthrough detallado sobre cómo identificar una inyección SQL ciega basada en tiempo, extraer credenciales administrativas y escalar a ejecución de comandos en el servidor."
publishDate: "2026-03-15"
tags: ["CTF", "Web Security", "SQLi", "Privilege Escalation"]
category: "Web Security"
readingTime: "7 min"
author: "Sebastián Villa"
---

## 🎯 Introducción

En este writeup analizamos una máquina de entrenamiento de nivel intermedio centrada en la explotación encadenada de vulnerabilidades web. El objetivo fue comprometer la aplicación web y obtener acceso como usuario no privilegiado en el sistema objetivo, para posteriormente escalar privilegios a `root`.

---

## 🔍 Fase 1: Reconocimiento y Enumeración

Iniciamos con un escaneo completo de puertos mediante `nmap`:

```bash
nmap -p- --min-rate 1000 -sV -sC -Pn 10.10.11.45 -oN nmap_initial.txt
```

**Puertos descubiertos:**
- `22/tcp` - OpenSSH 8.9p1
- `80/tcp` - Apache httpd 2.4.52 (Ubuntu)
- `8080/tcp` - Node.js API Gateway

Al inspeccionar el servicio web en el puerto 80, encontramos un portal de consulta de inventario que procesaba el parámetro `filter` a través de peticiones HTTP `POST`.

---

## 💉 Fase 2: Identificación de SQL Injection Ciega

Al enviar caracteres especiales como `'` y `"`, el servidor respondía con un código de estado `500 Internal Server Error` sin mostrar mensajes de error SQL visibles.

Procedimos a evaluar una inyección basada en tiempo (*Time-Based Blind SQLi*):

```sql
filter=tech' AND (SELECT 1 FROM (SELECT(SLEEP(5)))a)-- -
```

La respuesta tardó exactamente **5.08 segundos** en retornar, confirmando la vulnerabilidad.

### Extracción de Credenciales:
Utilizando un script en Python automatizado con búsqueda binaria condicional, logramos extraer el hash de la contraseña del usuario administrador:

```
admin:$2y$12$K8yR2u... (bcrypt)
```

---

## 🚀 Fase 3: Escalada y Conclusión

1. Tras romper el hash mediante diccionario (`hashcat -m 3200 ... rockyou.txt`), obtuvimos acceso al panel de administración.
2. Dentro del panel, existía una funcionalidad de exportación de reportes PDF que permitía inyectar etiquetas HTML.
3. Explotamos una vulnerabilidad de **Server-Side XSS / Local File Inclusion** a través del renderizador `wkhtmltopdf` para leer la clave privada SSH (`/home/developer/.ssh/id_rsa`).
4. Con la clave privada SSH, obtuvimos acceso a la consola del servidor.

### 🛡️ Lecciones de Mitigación Defensiva:
- **Consultas Parametrizadas (Prepared Statements):** Nunca concatenar directamente la entrada del usuario en consultas SQL.
- **Principio de Menor Privilegio:** La base de datos no debe ejecutarse como superusuario (`root`/`sa`).
- **Aislamiento de Renderizadores:** Los procesos que convierten HTML a PDF deben ejecutarse en sandbox sin acceso al sistema de archivos local (`--disable-local-file-access`).
