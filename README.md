> # Scenario : (Document Management System)
> # Create an Application that can do below
> - Integrate with google and sign-in / sign-up with google credentials into the application
> - Provide a UI to upload a document
> - Upload to be allowed only for signed-in users
> - Provide an option to share the document with other google users (can take any gmail id)
> - Initiate a mail from the application, intimating document has been shared.
> - Create permissions for document as part of sharing. 
> - Shared user should be able to login to the application and view/delete the shared documents.

> # Must Have (Core Scenario): 
> - Document Sharing Capability between users
> - Google Integration
> - Create groups and share documents/list of documents within the group. 

> # Bonus Scenarios: 

> - If a new user is added to the group, he should have access to all the shared documents. 
> - Create new role and privileges.
> - Permissions for the document: view only / download
> - Preferably use Python and associated frameworks to build this. 
> - Allow document editing

# Cloud-Nine

### Document Management System

- Create or Login using Google OAuth verification.
- Verified users can upload nested folder containers containing files to cloud and manage access rules.
- Invite members by their username and define their access rights to read/write/delete that file.
- Sync data in real-time for seamless sharing experience.


## Out-of-the-box features

- Compression of file using algorithms such as Huffman Algorithm.
- Chunking of the file and parallel upload of chunks for increased speed.
- Create groups and invite members to instantly share a file with pre-defined methods.
- Ability for verification of invited member using face recognition to avoid data leak.


### High Level Diagram

## Tech Stack  

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)

![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)

![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
## Installation

Install frontend with yarn

```bash
  cd .\website\
  yarn install
  yarn dev
```

 ## Screenshots
 
 - Google OAuth service for verification
 
 
![unknown](https://user-images.githubusercontent.com/78641951/190884456-c6810a00-5ac1-4bb1-838a-71de2e96bf5c.png)
![unknown2](https://user-images.githubusercontent.com/78641951/190884457-da2b8e51-d996-4fec-8604-39c46706f533.png)


- Dashboard to upload files from browser or create nested folders.
![unknown](https://user-images.githubusercontent.com/78641951/190884520-33118fc7-23f3-411d-a179-4d21f033d003.png)
![unknown2](https://user-images.githubusercontent.com/78641951/190884521-977f1c7d-9535-404d-9071-d2069aecaf98.png)
![unknown3](https://user-images.githubusercontent.com/78641951/190884524-a1d321d2-0ee1-4982-902e-8408d0f8538c.png)



- Creating workspaces/groups to collaborate on files instantly.
