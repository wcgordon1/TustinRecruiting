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
Public Key Infrastructure (PKI) is a comprehensive framework designed to manage digital identities and facilitate secure electronic communication by utilizing cryptographic keys and digital certificates. PKI is founded on the principles of asymmetric cryptography, which involves the use of a pair of cryptographic keys: a public key and a private key. The public key is accessible to anyone and is used to encrypt data, while the private key is kept confidential and is used to decrypt data. Digital certificates, issued by trusted Certificate Authorities (CAs), bind public keys to entities, ensuring the authenticity and integrity of the keys. PKI encompasses a range of components and processes including the generation, distribution, storage, and revocation of keys and certificates, all aimed at establishing a secure environment for digital transactions.

## Common Applications

### Secure Web Browsing
PKI is the backbone of secure web browsing, enabling HTTPS connections. Digital certificates are used to verify the identity of websites, ensuring that users are communicating with legitimate entities.

### Email Security
PKI facilitates secure email communication through protocols such as S/MIME, which encrypt emails and authenticate the sender's identity using digital signatures.

### Virtual Private Networks (VPNs)
PKI is utilized in VPNs to authenticate users and devices, ensuring that only authorized entities can access the network securely.

### Software Signing
PKI ensures the integrity and authenticity of software through code signing, which uses digital signatures to verify that software has not been tampered with.

## Safety Considerations

### Key Management
Proper management of cryptographic keys is crucial. Unauthorized access to private keys can compromise security, making it essential to implement robust key storage and access controls.

### Certificate Revocation
Certificates may need to be revoked if compromised or no longer valid. Implementing a reliable certificate revocation process, such as using Certificate Revocation Lists (CRLs) or Online Certificate Status Protocol (OCSP), is vital for maintaining security.

### Trust Hierarchy
The trustworthiness of PKI relies on the integrity of CAs. Organizations should carefully select trusted CAs and regularly audit their practices to prevent security breaches.

## Related Terms or Concepts

### Cryptographic Keys
Fundamental components of PKI that include public and private keys used for encryption and decryption.

### Certificate Authority (CA)
An entity that issues digital certificates, verifying the identity of organizations and individuals.

### Digital Signature
A cryptographic technique used to authenticate the identity of the sender and ensure the integrity of the message.

### Asymmetric Cryptography
A cryptographic method using a pair of keys (public and private) for secure communication, forming the basis of PKI.

### Certificate Revocation List (CRL)
A list of certificates that have been revoked before their expiration date and should no longer be trusted.

### Online Certificate Status Protocol (OCSP)
A protocol used for obtaining the revocation status of a digital certificate in real-time.
