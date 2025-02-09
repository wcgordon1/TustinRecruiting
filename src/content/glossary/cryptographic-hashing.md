---
term: Cryptographic Hashing
icon: 'mdi:security'
category: Software Engineering
vertical: Cybersecurity
description: >-
  A process that converts data into a fixed-size hash value to ensure data
  integrity.
details:
  - title: Category
    value: Software Engineering
  - title: Industry
    value: Cybersecurity
  - title: Related Terms
    value: None
---
Cryptographic hashing is a fundamental process in cybersecurity, involving the transformation of input data, known as a message, into a fixed-size string of bytes, typically represented as a hexadecimal number. This transformation is governed by a hash function, which is designed to be a one-way function, meaning it is computationally infeasible to reverse the process to retrieve the original input data from the hash value. The hash value, also referred to as a "digest," serves as a unique fingerprint of the input data, ensuring data integrity by allowing any changes to the data to be easily detected. Cryptographic hash functions are characterized by properties such as determinism, pre-image resistance, small changes in input producing significant changes in output (avalanche effect), and collision resistance.

## Common Applications

### Data Integrity Verification
Cryptographic hashes are widely used to verify the integrity of data files and messages. By comparing the hash value generated from the original data to that of a received or stored version, one can determine if the data has been altered.

### Password Storage
Hashes are used to securely store passwords. Instead of storing plain text passwords, systems store the hash values, making it difficult for attackers to retrieve the original passwords even if they access the hash values.

### Digital Signatures
Digital signatures employ cryptographic hashing to verify the authenticity and integrity of a message or document. The hash of the message is encrypted with a private key to create the signature, which can be decrypted by the recipient using the corresponding public key.

### Blockchain Technology
In blockchain systems, cryptographic hashing ensures the integrity of transaction data. Each block in a blockchain contains the hash of the previous block, creating a chain that is resistant to tampering.

## Safety Considerations

### Collision Attacks
A collision occurs when two different inputs produce the same hash value. Cryptographic hash functions are designed to minimize the risk of collisions, but they are not impossible. Using a hash function that is known to be collision-resistant is crucial for maintaining security.

### Length Extension Attacks
Certain hash functions are vulnerable to length extension attacks, where an attacker can append data to the end of a hashed message without knowing the original message, and still produce a valid hash. Choosing a hash function resistant to such attacks, like those based on the SHA-3 standard, can mitigate this risk.

### Obsolescence of Hash Functions
Some older cryptographic hash functions, such as MD5 and SHA-1, have been found to be insecure due to vulnerabilities that facilitate collision attacks. It is important to use modern hash functions like SHA-256 or SHA-3 to ensure robust security.

## Related Terms or Concepts

### Hash Function
A mathematical algorithm that transforms input data of variable length into a fixed-size string of text, serving as the basis for cryptographic hashing.

### Salt
A random value added to input data before hashing, used to enhance security by preventing attacks such as rainbow table attacks on stored hash values.

### Hash Collision
An event where two different inputs produce the same hash output, which cryptographic hash functions aim to minimize.

### Pre-image Resistance
A property of hash functions that makes it computationally infeasible to reverse-engineer the original input data from its hash value.

### Digital Certificate
An electronic document used to prove the ownership of a public key, often containing a hash of the document to ensure its integrity during transmission.
