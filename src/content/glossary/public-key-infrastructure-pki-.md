---
term: Public Key Infrastructure (PKI)
icon: 'mdi:security'
category: Software Engineering
vertical: Cybersecurity
description: >-
  A framework that uses cryptographic keys and digital certificates to secure
  communications.
details:
  - title: Category
    value: Software Engineering
  - title: Industry
    value: Cybersecurity
  - title: Related Terms
    value: >-
      Cryptographic Hashing, Identity and Access Management (IAM), Zero Trust
      Architecture, Data Loss Prevention (DLP), Security Orchestration,
      Automation, and Response (SOAR)
---
Public Key Infrastructure (PKI) is a comprehensive framework designed to manage, distribute, and authenticate digital certificates and public keys that are used to secure electronic communications. It plays a crucial role in ensuring the confidentiality, integrity, authenticity, and non-repudiation of digital communications and transactions. PKI involves a set of hardware, software, policies, and standards that work together to provide a secure method for exchanging information over untrusted networks, such as the internet. At its core, PKI uses a pair of cryptographic keys—a public key and a private key—to encrypt and decrypt data. The public key is openly distributed, while the private key is kept secure by the owner. Digital certificates, which are issued by trusted Certificate Authorities (CAs), bind public keys to the identities of their owners, ensuring that each party in a communication can be verified.

## Common Applications

### Secure Email
PKI is used to encrypt emails and authenticate the identity of the sender, ensuring that the messages remain confidential and unaltered.

### Secure Web Browsing
PKI enables HTTPS, which is used to secure communications between web browsers and servers, protecting data from eavesdropping and tampering.

### Digital Signatures
Digital signatures, powered by PKI, provide a way to verify the authenticity and integrity of digital documents, ensuring they have not been altered after signing.

### VPNs and Network Security
PKI is instrumental in establishing secure Virtual Private Network (VPN) connections, ensuring that data transmitted over the network remains private and secure.

## Safety Considerations

### Key Management
Proper management of cryptographic keys is crucial. Loss or compromise of a private key can lead to unauthorized access or data breaches.

### Certificate Authority Trust
The security of PKI-based systems relies heavily on the trustworthiness of Certificate Authorities. A compromised or malicious CA can issue fraudulent certificates.

### Revocation and Expiry
Digital certificates need to be revoked if compromised and renewed upon expiry. Failure to manage certificates properly can lead to security vulnerabilities.

## Related Terms or Concepts

### Certificate Authority (CA)
An entity responsible for issuing and managing digital certificates within a PKI. CAs validate the identity of certificate requestors before issuing certificates.

### Digital Certificate
An electronic document used to prove the ownership of a public key, containing information about the key, the identity of its owner, and the digital signature of a CA.

### Public and Private Keys
A pair of cryptographic keys used in PKI. The public key encrypts data, while the private key decrypts it, or vice versa, depending on the operation.

### SSL/TLS
Protocols that use PKI to secure communications over computer networks, particularly the internet, by encrypting data transmitted between web servers and clients.

### Cryptography
The practice and study of techniques for securing communication and information, forming the foundation upon which PKI is built.
