---
term: Privilege Escalation
icon: 'mdi:security'
category: Software Engineering
vertical: Cybersecurity
description: >-
  A security exploit where attackers gain higher access levels than originally
  permitted.
details:
  - title: Category
    value: Software Engineering
  - title: Industry
    value: Cybersecurity
  - title: Related Terms
    value: >-
      Zero Trust Architecture, Red Teaming, Penetration Testing, Bug Bounty
      Programs, Insider Threat Detection
---
Privilege Escalation refers to a security exploit in which an attacker gains elevated access to resources that are beyond those initially granted to them. This process involves taking advantage of programming errors, design flaws, or configuration oversights in an operating system or application to gain unauthorized privileges. The goal is typically to perform unauthorized actions, such as accessing restricted data, executing administrative commands, or installing malicious software. Privilege escalation can be categorized into two types: vertical privilege escalation, where the attacker gains higher-level permissions, and horizontal privilege escalation, where the attacker accesses privileges assigned to another user with similar access rights.

## Common Applications

### Exploiting Software Vulnerabilities
Attackers often exploit software vulnerabilities to achieve privilege escalation. This can occur when software updates are not applied, leaving known vulnerabilities unpatched and exploitable.

### Bypassing Access Controls
Inadequate access control mechanisms can be manipulated by attackers to escalate privileges. This includes weak password policies, poor session management, and improper configuration settings.

### Leveraging Social Engineering
Attackers may use social engineering tactics, such as phishing, to trick legitimate users into divulging credentials or executing malicious scripts that allow for privilege escalation.

## Safety Considerations

### Regular Security Audits
Conduct regular security audits and vulnerability assessments to identify and fix potential exploits before they can be used for privilege escalation.

### Patch Management
Ensure timely updates and patches for operating systems, applications, and software to mitigate the risks associated with known vulnerabilities.

### Principle of Least Privilege
Implement the principle of least privilege (PoLP) to restrict user access rights to the minimum necessary to perform their job functions, thus limiting the potential impact of privilege escalation.

## Related Terms or Concepts

### Vertical Privilege Escalation
This involves gaining higher-level privileges than those originally assigned, such as administrative or root access.

### Horizontal Privilege Escalation
This occurs when an attacker accesses the privileges of another user with similar access levels, rather than gaining higher access.

### User Account Control (UAC)
A security feature in modern operating systems designed to prevent unauthorized changes by requiring administrative approval, thereby reducing the likelihood of privilege escalation.

### Zero-Day Exploit
A previously unknown vulnerability that is exploited before developers have a chance to issue a patch, potentially leading to privilege escalation.
