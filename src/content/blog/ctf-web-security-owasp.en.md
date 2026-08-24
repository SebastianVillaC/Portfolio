---
lang: "en"
title: "From SQL Injection to Remote Code Execution: A CTF Challenge Analysis"
description: "Detailed walkthrough demonstrating how to identify a time-based blind SQL injection, exfiltrate administrative hashes, and pivot to server command execution."
publishDate: "2026-03-15"
tags: ["CTF", "Web Security", "SQLi", "Privilege Escalation"]
category: "Web Security"
readingTime: "7 min"
author: "Sebastián Villa"
---

## 🎯 Introduction

In this technical writeup, we analyze an intermediate CTF training machine focusing on chained web vulnerability exploitation. The primary objective was to penetrate the web application boundary, acquire low-privileged shell access, and escalate to `root`.

---

## 🔍 Phase 1: Reconnaissance & Port Scanning

We began by performing an aggressive full-port sweep using `nmap`:

```bash
nmap -p- --min-rate 1000 -sV -sC -Pn 10.10.11.45 -oN nmap_initial.txt
```

**Discovered Services:**
- `22/tcp` - OpenSSH 8.9p1
- `80/tcp` - Apache httpd 2.4.52 (Ubuntu)
- `8080/tcp` - Node.js API Gateway

Inspecting port 80 revealed an inventory management portal that accepted a `filter` POST parameter.

---

## 💉 Phase 2: Time-Based Blind SQLi Exploitation

Injecting quotation delimiters (`'`, `"`) triggered an unhandled `500 Internal Server Error` without revealing database error messages.

Testing for time delays confirmed the injection flaw:

```sql
filter=tech' AND (SELECT 1 FROM (SELECT(SLEEP(5)))a)-- -
```

The response took exactly **5.08 seconds** to resolve.

### Credential Extraction:
Using a custom Python script with binary search logic, we exfiltrated the administrator password hash:

```
admin:$2y$12$K8yR2u... (bcrypt)
```

---

## 🚀 Phase 3: Exploitation to RCE

1. After cracking the bcrypt hash with `hashcat`, we authenticated into the admin portal.
2. The dashboard offered an HTML-to-PDF export mechanism.
3. We leveraged **Server-Side XSS / Local File Inclusion** within the `wkhtmltopdf` binary to read `/home/developer/.ssh/id_rsa`.
4. Using the recovered private key, we successfully established SSH access to the machine.

### 🛡️ Defensive Remediation:
- **Prepared Statements:** Always parameterize queries regardless of context.
- **Least Privilege:** Web database users should never possess file access or superuser rights.
- **Sandboxed PDF Renderers:** Run utilities with `--disable-local-file-access` inside hardened containers.
