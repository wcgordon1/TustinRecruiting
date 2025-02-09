---
term: Serverless Computing
icon: 'mdi:cloud-arrow-right'
category: Software Engineering
vertical: Cloud
description: >-
  A cloud execution model where developers write code without managing the
  underlying infrastructure.
details:
  - title: Category
    value: Software Engineering
  - title: Industry
    value: Cloud
  - title: Related Terms
    value: >-
      Elastic Scaling, API Gateway, Cloud Cost Optimization, Edge Computing,
      GitOps
---
Serverless Computing is a cloud execution model that allows developers to write and deploy code without the need to manage the underlying infrastructure, such as servers and operating systems. In this model, cloud providers dynamically allocate the resources needed to run the code, and only charge for the actual compute time consumed by the execution of the code. This abstraction of server management enables developers to focus solely on writing their application logic, enhancing productivity and accelerating development cycles. Serverless computing is often event-driven, meaning that code execution is triggered by specific events or requests, leading to efficient utilization of resources.

## Common Applications

### Event-Driven Processing
Serverless computing is ideal for applications that require event-driven processing, such as responding to HTTP requests, processing files uploaded to cloud storage, or reacting to changes in a database.

### Microservices Architecture
Developers use serverless computing to build microservices, where each function handles a specific task within the larger application. This modular approach allows for easy scaling and independent deployment of application components.

### Data Processing
Serverless architectures are well-suited for data processing tasks, such as ETL (Extract, Transform, Load) processes, real-time data analysis, and stream processing, due to their ability to quickly scale based on workload demands.

### Backend for Mobile and Web Applications
Serverless can be used to build the backend logic for mobile and web applications, handling tasks like authentication, data validation, and business logic without the need to manage server resources.

## Safety Considerations

### Security
While serverless computing abstracts infrastructure management, security remains a critical consideration. Developers must ensure that their code is secure, as the cloud provider is responsible for securing the underlying infrastructure. Practices such as input validation, code scanning, and using secure APIs are essential.

### Cold Starts
Serverless functions can experience latency due to cold starts, which occur when an idle function is invoked and the cloud provider needs to start a new instance. This can impact application performance, particularly for latency-sensitive applications.

### Vendor Lock-In
Using serverless computing services often ties developers to a specific cloud provider, which can lead to vendor lock-in. It's important to design applications with portability in mind, ensuring that they can be migrated if necessary.

## Related Terms or Concepts

### Function as a Service (FaaS)
FaaS is a category within serverless computing that specifically refers to cloud providers managing the execution of functions. Each function performs a single-purpose task, and the provider handles resource allocation and scaling.

### Backend as a Service (BaaS)
BaaS is a cloud service model that offers backend services, such as databases, authentication, and push notifications, as fully managed services. It is often used in conjunction with serverless computing to build complete applications without managing any server infrastructure.

### Containers
Containers are a lightweight form of virtualization that package applications and their dependencies, allowing them to run consistently across different environments. While serverless abstracts infrastructure entirely, containers provide a middle ground where developers manage less infrastructure than with traditional virtual machines but more than with serverless functions.
