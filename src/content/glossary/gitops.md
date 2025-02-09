---
term: GitOps
icon: 'mdi:cloud-arrow-right'
category: Software Engineering
vertical: Cloud
description: >-
  A DevOps practice that uses Git repositories as the source of truth for
  managing cloud infrastructure.
details:
  - title: Category
    value: Software Engineering
  - title: Industry
    value: Cloud
  - title: Related Terms
    value: >-
      Infrastructure as Code (IaC), Continuous Deployment (CD), Immutable
      Infrastructure, Cloud Orchestration, Kubernetes Cluster Management
---
GitOps is a modern DevOps practice that leverages Git repositories as the definitive source of truth for managing and deploying cloud infrastructure and applications. In GitOps, all infrastructure configurations are stored as code in a Git repository. This approach allows teams to manage infrastructure in the same way they manage application code: through version control, pull requests, and automated deployments. By using Git as the single source of truth, GitOps ensures that the infrastructure is consistent, reproducible, and auditable. Changes to the infrastructure are proposed, reviewed, and approved through Git pull requests, and once merged, automated processes apply these changes to the cloud infrastructure. This methodology enhances collaboration, transparency, and security by providing a clear history of changes and enabling rollback to previous states if necessary.

## Common Applications

### Infrastructure as Code (IaC)

GitOps is often applied in the context of Infrastructure as Code, where infrastructure configurations are managed using code. This allows for automated provisioning and management of cloud resources.

### Continuous Deployment

GitOps facilitates continuous deployment by automating the deployment of applications and infrastructure changes as soon as they are committed and merged into the main branch of the Git repository.

### Kubernetes Management

GitOps is widely used in managing Kubernetes clusters. It automates the deployment and management of applications running on Kubernetes by using Git as the source of truth for cluster configurations.

## Safety Considerations

### Access Control

Ensure that access to Git repositories is properly managed to prevent unauthorized changes to infrastructure configurations. Use role-based access control (RBAC) to limit permissions.

### Rollback Mechanisms

Implement robust rollback mechanisms to quickly revert changes in case of failures or misconfigurations. This can be achieved by reverting to a previous commit in the Git repository.

### Automated Testing

Incorporate automated testing in the deployment pipeline to catch errors early in the process. This includes linting, unit tests, integration tests, and security scans.

## Related Terms or Concepts

### Continuous Integration/Continuous Deployment (CI/CD)

GitOps is closely related to CI/CD practices, which automate the integration and deployment of code changes. GitOps extends these practices to infrastructure management.

### DevOps

GitOps is a subset of DevOps practices, focusing specifically on using Git as a version control system for infrastructure management.

### Infrastructure as Code (IaC)

GitOps relies on the principles of Infrastructure as Code, where infrastructure configurations are managed using machine-readable definition files rather than physical hardware or interactive configuration tools.

### Version Control Systems

Git is a popular version control system used in GitOps to track and manage changes to both application code and infrastructure configurations.
