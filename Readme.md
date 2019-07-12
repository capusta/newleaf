### newleaf
A devops-centered approach to deploying nicely wrapped code (for free!).
#### Getting Started (Level 1)
1. Download and install [Vagrant](https://www.vagrantup.com/downloads.html)
3. Download and install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
4. [Clone](https://help.github.com/en/articles/cloning-a-repository) this repository   
5. Inside repository folder: `vagrant up`
6. Visit [http://localhost:3000](http://localhost:3000)

#### Getting Started (Level 2)
1.  Install google App Engine SDK 
	`vagrant provision --provision-with gcloud`
2.  [Create application]([https://cloud.google.com/appengine/docs/standard/nodejs/building-app/creating-project#creating-a-gcp-project](https://cloud.google.com/appengine/docs/standard/nodejs/building-app/creating-project#creating-a-gcp-project)) in google console, make service accounts, assign buckets permissions.  
3. Iterate app a few times with
  `vagrant provision --provision-with dev`
4. Login into google:
  1.  `vagrant ssh`
