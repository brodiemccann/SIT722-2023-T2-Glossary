var express = require('express');
var router = express.Router();

const itemList = [
  { id: 1, term: 'DevOps', definition: 'DevOps applies a set of tools, practices, and cultural philosophies to improve collaboration between development and operations teams within an organisation. Its primary goal is to break down silos between these traditionally separate functions and integrate the work and teams as much as possible to enhance the overall efficiency and effectiveness of the software development process.', references: 'AWS (2023) What is DevOps?, Amazon Web Service Inc., accessed 20 July 2023. https://aws.amazon.com/devops/what-is-devops/ and AXELOS (2015) PRINCE2 Agile®, 1st edn, United Kingdom.' },
  { id: 2, term: 'Waterfall', definition: 'The waterfall methodology uses a sequential or linear approach to software development, with distinct goals for each development phase. In this approach, development phases must be completed before moving onto the next, and previous phases cannot be revisited.', references: 'Sherman R (2015) ‘Project Management’, Business Intelligence Guidebook, pp.449-492. DOI: https://doi.org/10.1016/B978-0-12-411461-6.00018-6 and AXELOS (2018) Managing Successful Projects with PRINCE2, 6th edn, United Kingdom.' },
  { id: 3, term: 'Agile', definition: 'The Agile methodology describes a collection of behaviours, frameworks, concepts, and techniques that combine to support a more iterative, collaborative approach to software development. It emphasises adaptability, customer feedback, and delivering working software in short, incremental cycles (sprints). Scrum and Kanban are examples of specific Agile methods.', references: 'AXELOS (2018) Managing Successful Projects with PRINCE2, 6th edn, United Kingdom.' },
  { id: 4, term: 'Silos', definition: 'Organisational silos refer to the isolation of teams or entire departments from other parts of the business due to a lack of information and knowledge sharing. These barriers contribute to organisational inefficiencies including, duplicate work efforts, poor resource allocation, decreased productivity and ineffective decision-making processes.', references: 'Billingsley S (27 May 2021) Organisational Silos, LinkedIn, accessed 20 July 2021. https://www.linkedin.com/pulse/organizational-silos-scott-billingsley/' },
  { id: 5, term: 'CI/CD', definition: 'CI/CD falls under DevOps and combines the practice of continuous integration and continuous deployment. It applies a continuous and iterative build, test and deploy process through automation to streamline the development process, detect and fix issues early, and deliver software updates more frequently and reliably.', references: 'GitLab (2023) What is CI/CD, GitLab B.V., accessed 20 July 2023. https://about.gitlab.com/topics/ci-cd/' },
  { id: 6, term: 'Microservices', definition: 'Microservices represent an architectural and organisational approach to software development where software is composed of small, independent, and loosely coupled services that can be developed, deployed, and scaled independently. These services are owned by small, self-contained teams and promote agility, flexibility, and technological freedom.', references: 'AWS (2023) Microservices, Amazon Web Service Inc., accessed 20 July 2023. https://aws.amazon.com/microservices/' },
  { id: 7, term: 'Technical Debt', definition: 'Technical debt – or tech debt – refers to the implied costs of businesses taking shortcuts to expedite the delivery of functionality that will have a negative impact on them in the future.  Simply put, it is the result of prioritising delivery speed over perfect implementation (code).', references: 'Lutkevich B (Feb 2023) Technical Debt, TechTarget, accessed 21 July 2023. https://www.techtarget.com/whatis/definition/technical-debt' },
  { id: 8, term: 'Open-Source', definition: 'Open-source software refers to software that is publicly available for use, modification and distribution as users or developers see fit. It is developed and maintained via open collaboration, fostering transparency, customisation, and innovation.', references: 'IBM (n.d.) What isopen source software? [newsletter], IBM, accessed 21 July 2023. https://www.ibm.com/topics/open-source' },
  { id: 9, term: 'COTS', definition: 'In software development, COTS (Commercial Off the Shelf) refer to pre-built software applications or products that are available for sale, lease, or license to the general public. These applications and products are often developed by third-party vendors for organisations to implement or integrate.', references: 'NIST (n.d.) commercial-off-the-shf (COTS), Computer Security Resource Center (CSRS), accessed 21 July 2023. https://csrc.nist.gov/glossary/term/commercial_off_the_shelf' },
  { id: 10, term: 'Tool Ecosystems', definition: 'Tool ecosystems refer to the collection of software tools and technologies that combine to support the various stages of software development. In DevOps tool stacks assist individuals to operate and develop applications quickly. This increases productivity and delivery timeframes while reducing overall costs. ', references: 'Bangbit Technologies (9 Dec 2018) A comprehensive Guide to DevOps & It’s Tools Ecosystem, medium.com, accessed 20 July 2023. https://medium.com/@BangBitTech/a-comprehensive-guide-to-devops-its-tools-ecosystem-83d739cdf543' },
  { id: 11, term: 'MVP', definition: 'A Minimum Viable Product (MVP) is a version of a new product or software application that includes only the most essential features and functionalities necessary to satisfy early users (or customers) and gather feedback. The primary goal of an MVP is to enable quick delivery of a working version of the product to the market, learn from user interactions, and iterate based on real-world feedback.', references: 'Rouse M (14 August 2020) ‘Minimum Viable Product’, techopedia, accessed 5 August 2023. https://www.techopedia.com/definition/27809/minimum-viable-product-mvp'},
  { id: 12, term: 'DoD', definition: 'The Definition of Done (DoD) is a clear and agreed-upon set of acceptance criteria that outlines the specific conditions that must be met for a software product to be considered complete and ready for release. It ensures a shared understanding among the team and stakeholders about the quality and completeness expected.', references: 'Huether D (2023) ‘Definition of Done’, LeadingAgile, accessed 5 August 2023. https://www.leadingagile.com/2017/02/definition-of-done/' },
  { id: 13, term: 'Everything-as-Code', definition: '‘Everything as Code’ is an approach to IT operations and DevOps that uses code to define and manage resources, including infrastructure. It moves away from manual, repetitive tasks to workflows based on end goals and desired states. Code-based configuration files are commonly used to define security requirements for applications and to manage CI/CD processes. ', references: 'Batraski E (14 May 2020) ‘The beginning of ‘Everything as Code’, Ethan Batraski’s Writings, accessed 5 August 2023. https://medium.com/ethanjb/the-beginning-of-everything-as-code-a25c4e9a75e9 '},
  { id: 14, term: 'ITSM', definition: 'IT Service Management (ITSM) is a set of practices and frameworks that support the efficient management of the end-to-end delivery of IT services to customers. This includes the processes and activities to design, create, deliver, and support IT services. Underpinning ITSM, is the belief that IT should be delivered as a service.', references: 'Atlassian (n.d.) ‘What is IT Service Management (ITSM)?’, Atlassian, accessed 5 August 2023. https://www.atlassian.com/itsm'},
  { id: 15, term: 'Automation', definition: 'Automation refers to the use of technology and processes to perform tasks with minimal human intervention. It aims to streamline repetitive or manual activities by replacing them with automated systems, software, or mechanisms, leading to increased efficiency, consistency, and reduced errors.', references: 'IBM (n.d.) ‘What is automation?’, IBM, accessed 5 August 2023. https://www.ibm.com/topics/automation' },
  { id: 16, term: 'Preprod', definition: 'Preprod or pre-production is designed to simulate the production environment. It serves as a controlled and representative space for testing new features, configurations, and updates to ensure they work as intended, minimize risks, and gather feedback before reaching end-users in the live production setting. It also has the added benefit of scaling while testing. ', references: 'Langshall A (6 September 2016) ‘Oh, the Things Preprod Can Do: Catching More Bugs with a Production-Like Testing Environment’, Lucidchart, accessed 5 August 2023. https://www.lucidchart.com/techblog/2016/09/06/oh-the-things-preprod-can-do-catching-more-bugs-with-a-production-like-testing-environment/'},
  { id: 17, term: 'IaC', definition: 'Infrastructure as Code (IaC) is an approach where infrastructure components, such as servers, networks, and databases, are defined and managed using code and automation tools. This helps to reduce the manual setup process and ensure accuracy and consistency in the management of IT resources.', references: 'RedHat (11 May 2022) ‘What is Infrastructure as Code (IaC)?’, Redhat, accessed 5 August 2023. https://www.redhat.com/en/topics/automation/what-is-infrastructure-as-code-iac'},
  { id: 18, term: 'Containers', definition: 'Containers are packages of software that contain all the necessary elements to run in an isolated environment. By virtualising the operating system, they can run from anywhere (private data centre, public cloud, or personal device), providing an efficient way to deploy, run, and manage applications.', references: 'Google Cloud (2023) ‘What are containers?’, Google Cloud, accessed 5 August 2023. https://cloud.google.com/learn/what-are-containers'},
  { id: 19, term: 'Virtual Machine', definition: 'A virtual machine (VM) is a software-based emulation of a physical computer that runs within a host system. One or more virtual “guest” machines can run on a physical “host” machine, with each VM running its own separate operating system and functions. This provides isolation and flexibility for various applications and tasks.', references: 'VMware (n.d.) ‘What is a virtual machine?’, VMware, accessed 5 August 2023. https://www.vmware.com/au/topics/glossary/content/virtual-machine.html'},
  { id: 20, term: 'Repositories', definition: 'A repository, is a centralised digital storage location that developers use to make and manage changes to an application’s source code. A repository has features that allow developers to easily track code changes, simultaneously edit files, and efficiently collaborate on the same project from any location.', references: 'AWS (n.d.) ‘What is Repo?’, Amazon Web Service, accessed 5 August 2023. https://aws.amazon.com/what-is/repo/'},
];


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'SIT722 DevOps Glossary', sub: 'This glossary defines confusing terms associated with DevOps.', items: itemList });
});

module.exports = router;
